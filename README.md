# Strudel MCP Server

A Model Context Protocol (MCP) server for [Strudel](https://strudel.cc/), enabling AI agents to interact with the Strudel live coding environment through browser automation.

## Features

- 🎹 **16 MCP Tools** for complete Strudel control
- 🌐 **Browser Automation** via Playwright for real-time interaction
- 💾 **Pattern Storage** with tagging and session management
- 📝 **History Management** with undo/redo support
- 🔊 **Audio Analysis** (basic features)
- 🧪 **Comprehensive Test Suite** with 10+ test files

## Tools Available

### Core Control (6 tools)
- `strudel_init` - Initialize browser session
- `strudel_write` - Write pattern to editor
- `strudel_get_pattern` - Read current pattern
- `strudel_play` - Start playback
- `strudel_stop` - Stop playback
- `strudel_clear` - Clear editor

### Pattern Manipulation (3 tools)
- `strudel_append` - Append code to pattern
- `strudel_insert` - Insert at specific line
- `strudel_replace` - Replace text in pattern

### Session Management (3 tools)
- `strudel_save` - Save pattern with tags
- `strudel_load` - Load saved pattern
- `strudel_list` - List saved patterns

### Analysis & Utility (4 tools)
- `strudel_analyze` - Basic audio analysis
- `strudel_status` - Get current status
- `strudel_screenshot` - Capture screenshot
- `strudel_undo` / `strudel_redo` - History management

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Docker and Docker Compose (optional, for containerized deployment)

### From Source

```bash
# Clone the repository
git clone https://github.com/TheEmilz/strudelMCP.git
cd strudelMCP

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Build the project
npm run build
```

### Using Docker

```bash
# Clone the repository
git clone https://github.com/TheEmilz/strudelMCP.git
cd strudelMCP

# Install dependencies and build (required before Docker build)
npm install
npm run build

# Start with Docker Compose
docker compose up -d
```

## Usage

### As MCP Server (stdio)

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "strudel": {
      "command": "node",
      "args": ["/path/to/strudelMCP/dist/index.js"]
    }
  }
}
```

### As Docker Container

The server can also run in a Docker container and be accessed via HTTP/SSE, making it accessible from external agents.

#### Using Docker Compose (Recommended)

```bash
# Start the server
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the server
docker-compose down
```

The server will be available at:
- HTTP endpoint: `http://localhost:3000`
- SSE endpoint: `http://localhost:3000/sse`
- Health check: `http://localhost:3000/health`

#### Using Docker directly

```bash
# Build the image
docker build -t strudel-mcp-server .

# Run the container
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/patterns:/app/patterns \
  -e STRUDEL_HEADLESS=true \
  -e STRUDEL_TRANSPORT=http \
  --name strudel-mcp \
  strudel-mcp-server
```

#### Environment Variables

- `STRUDEL_TRANSPORT`: Transport mode (`stdio`, `http`, or `streamable-http`/`web`). Default: `stdio`
- `STRUDEL_PORT`: HTTP server port (only for HTTP transports). Default: `3000`
- `STRUDEL_HEADLESS`: Run browser in headless mode. Default: `false`
- `STRUDEL_URL`: Strudel URL to connect to. Default: `https://strudel.cc/`
- `NODE_ENV`: Node environment. Default: `development`

### Using with Chrome webMCP (Streamable HTTP)

The server supports the MCP Streamable HTTP transport, which is compatible with Google Chrome's webMCP feature available in Chrome Beta for developers. This allows browser-based AI agents to connect directly to the Strudel MCP server.

#### Start the server in Streamable HTTP mode

```bash
# From source
STRUDEL_TRANSPORT=streamable-http STRUDEL_HEADLESS=true node dist/index.js

# Or using 'web' shorthand
STRUDEL_TRANSPORT=web node dist/index.js

# With custom port
STRUDEL_TRANSPORT=streamable-http STRUDEL_PORT=8080 node dist/index.js
```

#### Endpoints

When running in Streamable HTTP mode, the following endpoints are available:

- **`POST /mcp`** - Send JSON-RPC messages (initialize, tool calls)
- **`GET /mcp`** - Open SSE stream for server-initiated messages (requires `mcp-session-id` header)
- **`DELETE /mcp`** - Terminate a session (requires `mcp-session-id` header)
- **`GET /health`** - Health check endpoint

#### CORS Support

The Streamable HTTP transport includes CORS headers to allow cross-origin browser access:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, mcp-session-id, Last-Event-ID`
- `Access-Control-Expose-Headers: mcp-session-id`

#### Docker with Streamable HTTP

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/patterns:/app/patterns \
  -e STRUDEL_HEADLESS=true \
  -e STRUDEL_TRANSPORT=streamable-http \
  --name strudel-mcp \
  strudel-mcp-server
```

### Connecting to Docker MCP Server

When running in Docker with HTTP transport, you can connect to the MCP server using the SSE endpoints:

```
SSE Connection: http://localhost:3000/sse
POST Messages: http://localhost:3000/messages?sessionId=<session-id>
```

#### Docker Build Notes

**Note**: The Docker build process includes these steps:
1. Build the TypeScript code locally first (`npm run build`)
2. Copy the compiled `dist` folder and `node_modules` into the container
3. Playwright browsers are installed during the build, but may fail in restricted network environments

If you encounter certificate errors during the Playwright installation, the server will still start successfully, but you'll need to ensure Playwright browsers are available. The build process continues even if Playwright installation fails.

**Before building**: Make sure to run `npm run build` locally to generate the `dist` folder.

### Example Workflow

```javascript
// 1. Initialize Strudel
strudel_init()

// 2. Write a pattern
strudel_write({
  pattern: 's("bd hh sd hh")'
})

// 3. Play the pattern
strudel_play()

// 4. Save the pattern
strudel_save({
  name: "simple-beat",
  tags: ["basic", "drums"]
})

// 5. Stop playback
strudel_stop()
```

## Development

### Build

```bash
npm run build       # Compile TypeScript
npm run dev         # Watch mode
```

### Testing

```bash
npm test                    # Run unit tests
npm run test:integration    # Run integration tests
```

### Test Files

The project includes 10+ test files:

#### Unit Tests
- `tests/unit/browser.test.js` - Browser automation tests
- `tests/unit/storage.test.js` - Pattern storage tests
- `tests/unit/tools.test.js` - MCP tools tests
- `tests/unit/schemas.test.js` - Schema validation tests
- `tests/unit/history.test.js` - History management tests
- `tests/unit/patterns.test.js` - Pattern examples tests

#### Integration Tests
- `tests/integration/browser.test.js` - Browser integration tests
- `tests/integration/workflow.test.js` - End-to-end workflow tests

#### Test Fixtures
- `tests/fixtures/strudel-embed.html` - Embedded Strudel test page
- `tests/fixtures/strudel-iframe.html` - iframe integration test page
- `tests/fixtures/patterns.js` - Example patterns library

### Linting

```bash
npm run lint
```

## Architecture

The server supports three transport modes:

### stdio Transport (Default)
```
┌─────────────────────────────────────┐
│         MCP Client (AI)             │
└────────────┬────────────────────────┘
             │ stdio
┌────────────▼────────────────────────┐
│      MCP Server (index.ts)          │
│  ┌──────────────────────────────┐   │
│  │   Tool Request Handler       │   │
│  └────────┬─────────────────────┘   │
└───────────┼─────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
┌───▼────┐    ┌─────▼──────┐
│ Browser│    │  Storage   │
│ (Play- │    │  (Pattern  │
│ wright)│    │   files)   │
└────────┘    └────────────┘
```

### HTTP/SSE Transport (Docker)
```
┌─────────────────────────────────────┐
│    External MCP Client (Agent)      │
└────────────┬────────────────────────┘
             │ HTTP/SSE
┌────────────▼────────────────────────┐
│   Docker Container                  │
│  ┌────────────────────────────────┐ │
│  │  Express HTTP Server + SSE     │ │
│  │  (Port 3000)                   │ │
│  └──────────┬─────────────────────┘ │
│  ┌──────────▼─────────────────────┐ │
│  │   MCP Server (index.ts)        │ │
│  │  ┌──────────────────────────┐  │ │
│  │  │  Tool Request Handler    │  │ │
│  │  └────────┬─────────────────┘  │ │
│  └───────────┼────────────────────┘ │
└──────────────┼──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐    ┌─────▼──────┐
   │ Browser│    │  Storage   │
   │ (Play- │    │  (Pattern  │
   │ wright)│    │   files)   │
   └────────┘    └────────────┘
```

### Streamable HTTP Transport (Chrome webMCP)
```
┌─────────────────────────────────────┐
│  Chrome Beta / Browser MCP Client   │
│  (webMCP agent)                     │
└────────────┬────────────────────────┘
             │ Streamable HTTP (POST/GET/DELETE /mcp)
             │ + CORS headers
┌────────────▼────────────────────────┐
│  Express HTTP Server                │
│  ┌────────────────────────────────┐ │
│  │ StreamableHTTPServerTransport  │ │
│  │ (per-session, stateful)        │ │
│  └──────────┬─────────────────────┘ │
│  ┌──────────▼─────────────────────┐ │
│  │   MCP Server (index.ts)        │ │
│  │  ┌──────────────────────────┐  │ │
│  │  │  Tool Request Handler    │  │ │
│  │  └────────┬─────────────────┘  │ │
│  └───────────┼────────────────────┘ │
└──────────────┼──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐    ┌─────▼──────┐
   │ Browser│    │  Storage   │
   │ (Play- │    │  (Pattern  │
   │ wright)│    │   files)   │
   └────────┘    └────────────┘
```

### Components

- **index.ts** - MCP server entry point with stdio, HTTP/SSE, and Streamable HTTP transports
- **browser.ts** - Playwright-based browser automation
- **tools.ts** - MCP tool definitions and handlers
- **storage.ts** - Pattern persistence and management

## Configuration

The server can be configured via constructor options:

```typescript
const browser = new StrudelBrowser({
  headless: false,           // Show browser window
  strudelUrl: 'https://strudel.cc/'
});

const storage = new PatternStorage('./patterns');
```

## Pattern Storage

Patterns are saved as JSON files in the `patterns/` directory:

```json
{
  "id": "pattern_1234567890_abc123",
  "name": "my-pattern",
  "code": "s(\"bd hh sd hh\")",
  "tags": ["drums", "basic"],
  "timestamp": 1234567890000
}
```

## Browser Compatibility

The server uses Playwright with Chromium for browser automation. It interacts with:
- The official Strudel.cc website
- Embedded Strudel REPL (`@strudel/embed`)
- Custom HTML pages with Strudel iframes

## SSE Support

The server uses the stdio transport for communication but can be extended to support Server-Sent Events (SSE) for bidirectional communication by using the appropriate MCP SDK transport.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- [Strudel](https://strudel.cc/) - The live coding environment
- [Model Context Protocol](https://modelcontextprotocol.io/) - The MCP specification
- [williamzujkowski/strudel-mcp-server](https://github.com/williamzujkowski/strudel-mcp-server) - Reference implementation
- [Playwright](https://playwright.dev/) - Browser automation

## Related Projects

- [Strudel](https://github.com/tidalcycles/strudel) - Main Strudel repository
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Playwright](https://github.com/microsoft/playwright)

## Status

**Active Development** - This project is functional but under active development. Core features work reliably, but expect some rough edges and breaking changes.

## Support

- 📖 [Documentation](https://github.com/TheEmilz/strudelMCP)
- 🐛 [Issue Tracker](https://github.com/TheEmilz/strudelMCP/issues)
- 💬 [Discussions](https://github.com/TheEmilz/strudelMCP/discussions)
