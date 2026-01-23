import { StrudelBrowser } from './browser.js';
import { PatternStorage } from './storage.js';
import { z } from 'zod';

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  handler: (args: any) => Promise<any>;
}

export class StrudelTools {
  private browser: StrudelBrowser;
  private storage: PatternStorage;
  private historyStack: string[] = [];
  private historyIndex: number = -1;

  constructor(browser: StrudelBrowser, storage: PatternStorage) {
    this.browser = browser;
    this.storage = storage;
  }

  getTools(): ToolDefinition[] {
    return [
      // Core control tools
      {
        name: 'strudel_init',
        description: 'Initialize Strudel browser session. Must be called first.',
        inputSchema: z.object({}),
        handler: async () => {
          await this.browser.initialize();
          return { success: true, message: 'Strudel initialized successfully' };
        },
      },
      {
        name: 'strudel_write',
        description: 'Write a pattern to the Strudel editor',
        inputSchema: z.object({
          pattern: z.string().describe('The Strudel pattern code to write'),
        }),
        handler: async ({ pattern }) => {
          await this.browser.writePattern(pattern);
          this.addToHistory(pattern);
          return { success: true, pattern };
        },
      },
      {
        name: 'strudel_get_pattern',
        description: 'Get the current pattern from the Strudel editor',
        inputSchema: z.object({}),
        handler: async () => {
          const pattern = await this.browser.getPattern();
          return { success: true, pattern };
        },
      },
      {
        name: 'strudel_play',
        description: 'Start playing the current pattern',
        inputSchema: z.object({}),
        handler: async () => {
          await this.browser.play();
          return { success: true, message: 'Playback started' };
        },
      },
      {
        name: 'strudel_stop',
        description: 'Stop playing the current pattern',
        inputSchema: z.object({}),
        handler: async () => {
          await this.browser.stop();
          return { success: true, message: 'Playback stopped' };
        },
      },
      {
        name: 'strudel_clear',
        description: 'Clear the Strudel editor',
        inputSchema: z.object({}),
        handler: async () => {
          await this.browser.clear();
          return { success: true, message: 'Editor cleared' };
        },
      },
      // Pattern manipulation tools
      {
        name: 'strudel_append',
        description: 'Append a pattern to the current content',
        inputSchema: z.object({
          pattern: z.string().describe('The pattern code to append'),
        }),
        handler: async ({ pattern }) => {
          await this.browser.appendPattern(pattern);
          const currentPattern = await this.browser.getPattern();
          this.addToHistory(currentPattern);
          return { success: true, pattern: currentPattern };
        },
      },
      {
        name: 'strudel_insert',
        description: 'Insert a pattern at a specific line number',
        inputSchema: z.object({
          lineNumber: z.number().describe('Line number to insert at (1-indexed)'),
          pattern: z.string().describe('The pattern code to insert'),
        }),
        handler: async ({ lineNumber, pattern }) => {
          await this.browser.insertAtLine(lineNumber, pattern);
          const currentPattern = await this.browser.getPattern();
          this.addToHistory(currentPattern);
          return { success: true, pattern: currentPattern };
        },
      },
      {
        name: 'strudel_replace',
        description: 'Replace text in the current pattern',
        inputSchema: z.object({
          oldText: z.string().describe('Text to replace'),
          newText: z.string().describe('Replacement text'),
        }),
        handler: async ({ oldText, newText }) => {
          await this.browser.replaceText(oldText, newText);
          const currentPattern = await this.browser.getPattern();
          this.addToHistory(currentPattern);
          return { success: true, pattern: currentPattern };
        },
      },
      // Session management tools
      {
        name: 'strudel_save',
        description: 'Save the current pattern',
        inputSchema: z.object({
          name: z.string().describe('Name for the pattern'),
          tags: z.array(z.string()).optional().describe('Tags for the pattern'),
        }),
        handler: async ({ name, tags = [] }) => {
          const pattern = await this.browser.getPattern();
          const saved = this.storage.save(name, pattern, tags);
          return { success: true, saved };
        },
      },
      {
        name: 'strudel_load',
        description: 'Load a saved pattern',
        inputSchema: z.object({
          nameOrId: z.string().describe('Name or ID of the pattern to load'),
        }),
        handler: async ({ nameOrId }) => {
          const pattern = this.storage.load(nameOrId);
          if (!pattern) {
            return { success: false, error: 'Pattern not found' };
          }
          await this.browser.writePattern(pattern.code);
          return { success: true, pattern };
        },
      },
      {
        name: 'strudel_list',
        description: 'List saved patterns',
        inputSchema: z.object({
          tag: z.string().optional().describe('Filter by tag'),
        }),
        handler: async ({ tag }) => {
          const patterns = this.storage.list(tag);
          return { success: true, patterns };
        },
      },
      // Audio analysis tools
      {
        name: 'strudel_analyze',
        description: 'Analyze current audio playback',
        inputSchema: z.object({}),
        handler: async () => {
          const analysis = await this.browser.analyzeAudio();
          return { success: true, analysis };
        },
      },
      {
        name: 'strudel_status',
        description: 'Get current playback status',
        inputSchema: z.object({}),
        handler: async () => {
          const state = await this.browser.getPlaybackState();
          const initialized = this.browser.isInitialized();
          return { success: true, initialized, ...state };
        },
      },
      // Utility tools
      {
        name: 'strudel_screenshot',
        description: 'Take a screenshot of the Strudel browser',
        inputSchema: z.object({
          path: z.string().describe('Path to save screenshot'),
        }),
        handler: async ({ path }) => {
          await this.browser.screenshot(path);
          return { success: true, path };
        },
      },
      // History management
      {
        name: 'strudel_undo',
        description: 'Undo last pattern change',
        inputSchema: z.object({}),
        handler: async () => {
          if (this.historyIndex > 0) {
            this.historyIndex--;
            const pattern = this.historyStack[this.historyIndex];
            await this.browser.writePattern(pattern);
            return { success: true, pattern };
          }
          return { success: false, message: 'Nothing to undo' };
        },
      },
      {
        name: 'strudel_redo',
        description: 'Redo last undone pattern change',
        inputSchema: z.object({}),
        handler: async () => {
          if (this.historyIndex < this.historyStack.length - 1) {
            this.historyIndex++;
            const pattern = this.historyStack[this.historyIndex];
            await this.browser.writePattern(pattern);
            return { success: true, pattern };
          }
          return { success: false, message: 'Nothing to redo' };
        },
      },
    ];
  }

  private addToHistory(pattern: string): void {
    // Remove any forward history if we're not at the end
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    }
    
    this.historyStack.push(pattern);
    this.historyIndex = this.historyStack.length - 1;
    
    // Keep history size reasonable (max 50 items)
    if (this.historyStack.length > 50) {
      this.historyStack.shift();
      this.historyIndex--;
    }
  }
}
