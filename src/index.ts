#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { Request, Response } from 'express';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { StrudelBrowser } from './browser.js';
import { PatternStorage } from './storage.js';
import { StrudelTools } from './tools.js';

class StrudelMCPServer {
  private server: Server;
  private browser: StrudelBrowser;
  private storage: PatternStorage;
  private tools: StrudelTools;

  constructor(headless: boolean = false) {
    this.server = new Server(
      {
        name: 'strudel-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize components
    this.browser = new StrudelBrowser({ headless });
    this.storage = new PatternStorage('./patterns');
    this.tools = new StrudelTools(this.browser, this.storage);

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const toolDefs = this.tools.getTools();
      return {
        tools: toolDefs.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: {
            type: 'object',
            properties: tool.inputSchema.shape,
            required: Object.keys(tool.inputSchema.shape).filter(
              (key) => !tool.inputSchema.shape[key].isOptional()
            ),
          },
        })),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      const toolDefs = this.tools.getTools();
      const tool = toolDefs.find((t) => t.name === name);

      if (!tool) {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
      }

      try {
        // Validate input
        const validatedArgs = tool.inputSchema.parse(args);
        
        // Execute tool
        const result = await tool.handler(validatedArgs);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new McpError(
            ErrorCode.InternalError,
            `Tool execution failed: ${error.message}`
          );
        }
        throw error;
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }

  private async cleanup(): Promise<void> {
    console.error('Shutting down...');
    await this.browser.close();
  }

  async runStdio(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Strudel MCP Server running on stdio');
  }

  async runHttp(port: number = 3000): Promise<void> {
    const app = createMcpExpressApp({ host: '0.0.0.0' });
    
    // Store transports by session ID
    const transports = new Map<string, SSEServerTransport>();

    // Health check endpoint
    app.get('/health', (_req: Request, res: Response) => {
      res.json({ status: 'ok', version: '1.0.0' });
    });

    // SSE endpoint for establishing the stream
    app.get('/sse', async (_req: Request, res: Response) => {
      console.error('New SSE connection established');
      
      try {
        // Create a new SSE transport for the client
        const transport = new SSEServerTransport('/messages', res);
        
        // Store the transport by session ID
        const sessionId = transport.sessionId;
        transports.set(sessionId, transport);

        // Set up onclose handler to clean up transport when closed
        transport.onclose = () => {
          console.error(`SSE transport closed for session ${sessionId}`);
          transports.delete(sessionId);
        };

        // Connect the transport to the MCP server
        await this.server.connect(transport);
        console.error(`SSE stream established with session ID: ${sessionId}`);
      } catch (error) {
        console.error('Error establishing SSE connection:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to establish SSE connection' });
        }
      }
    });

    // POST endpoint for receiving client messages
    app.post('/messages', async (req: Request, res: Response) => {
      const sessionId = req.query.sessionId as string;
      
      if (!sessionId) {
        res.status(400).json({ error: 'Missing sessionId' });
        return;
      }

      const transport = transports.get(sessionId);
      if (!transport) {
        res.status(404).json({ error: 'Session not found' });
        return;
      }

      try {
        await transport.handlePostMessage(req, res);
      } catch (error) {
        console.error('Error handling POST message:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to handle message' });
        }
      }
    });

    // Start the HTTP server
    app.listen(port, '0.0.0.0', () => {
      console.error(`Strudel MCP Server running on http://0.0.0.0:${port}`);
      console.error(`Health check: http://0.0.0.0:${port}/health`);
      console.error(`SSE endpoint: http://0.0.0.0:${port}/sse`);
    });
  }
}

// Determine transport mode from environment
const transportMode = process.env.STRUDEL_TRANSPORT || 'stdio';
const port = parseInt(process.env.STRUDEL_PORT || '3000', 10);
const headless = process.env.STRUDEL_HEADLESS === 'true';

// Start the server
const server = new StrudelMCPServer(headless);

if (transportMode === 'http' || transportMode === 'sse') {
  server.runHttp(port).catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} else {
  server.runStdio().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
