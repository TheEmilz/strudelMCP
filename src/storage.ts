import * as fs from 'fs';
import * as path from 'path';

export interface PatternMetadata {
  id: string;
  name: string;
  code: string;
  tags: string[];
  timestamp: number;
}

export class PatternStorage {
  private storageDir: string;
  private patterns: Map<string, PatternMetadata>;

  constructor(storageDir: string = './patterns') {
    this.storageDir = storageDir;
    this.patterns = new Map();
    this.ensureStorageDir();
    this.loadPatterns();
  }

  private ensureStorageDir(): void {
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
  }

  private loadPatterns(): void {
    const files = fs.readdirSync(this.storageDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(this.storageDir, file);
          const data = fs.readFileSync(filePath, 'utf-8');
          const pattern = JSON.parse(data) as PatternMetadata;
          this.patterns.set(pattern.id, pattern);
        } catch (error) {
          console.error(`Failed to load pattern ${file}:`, error);
        }
      }
    }
  }

  save(name: string, code: string, tags: string[] = []): PatternMetadata {
    const id = this.generateId();
    const pattern: PatternMetadata = {
      id,
      name,
      code,
      tags,
      timestamp: Date.now(),
    };

    this.patterns.set(id, pattern);
    
    const filePath = path.join(this.storageDir, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(pattern, null, 2));

    return pattern;
  }

  load(nameOrId: string): PatternMetadata | null {
    // Try by ID first
    if (this.patterns.has(nameOrId)) {
      return this.patterns.get(nameOrId)!;
    }

    // Try by name
    for (const pattern of this.patterns.values()) {
      if (pattern.name === nameOrId) {
        return pattern;
      }
    }

    return null;
  }

  list(tag?: string): PatternMetadata[] {
    const allPatterns = Array.from(this.patterns.values());
    
    if (tag) {
      return allPatterns.filter(p => p.tags.includes(tag));
    }

    return allPatterns;
  }

  delete(nameOrId: string): boolean {
    const pattern = this.load(nameOrId);
    if (!pattern) return false;

    this.patterns.delete(pattern.id);
    
    const filePath = path.join(this.storageDir, `${pattern.id}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return true;
  }

  private generateId(): string {
    return `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
