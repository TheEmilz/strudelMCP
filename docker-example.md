# Docker MCP Server Example

This example demonstrates how to use the Strudel MCP Server in Docker mode with HTTP/SSE transport.

## Quick Start

1. **Build the project locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Start the Docker container:**
   ```bash
   docker compose up -d
   ```

3. **Verify the server is running:**
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"ok","version":"1.0.0"}
   ```

## Connecting to the MCP Server

The server exposes the following endpoints:

- **Health Check**: `GET http://localhost:3000/health`
- **SSE Connection**: `GET http://localhost:3000/sse`
- **POST Messages**: `POST http://localhost:3000/messages?sessionId=<session-id>`

### SSE Connection Flow

1. Client connects to the SSE endpoint (`/sse`)
2. Server creates a session and returns a `sessionId` in the SSE stream
3. Client sends MCP protocol messages to `/messages?sessionId=<session-id>`
4. Server responds through the SSE stream

### Example: Connecting with curl

```bash
# Terminal 1: Establish SSE connection (keep running)
curl -N http://localhost:3000/sse

# Terminal 2: Send an MCP message (in another terminal)
# First, get the sessionId from the SSE stream output
SESSION_ID="<session-id-from-sse>"

# Send a list tools request
curl -X POST http://localhost:3000/messages?sessionId=$SESSION_ID \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

## Using with MCP Clients

The Docker MCP server can be used with any MCP client that supports HTTP/SSE transport, such as:

- MCP Inspector
- Custom MCP clients built with the MCP SDK
- AI agents that support MCP protocol

### Example Client Configuration

```json
{
  "mcpServers": {
    "strudel": {
      "url": "http://localhost:3000/sse",
      "transport": "sse"
    }
  }
}
```

## Environment Variables

Customize the server behavior with environment variables:

```bash
docker run -d \
  -p 3000:3000 \
  -e STRUDEL_TRANSPORT=http \
  -e STRUDEL_PORT=3000 \
  -e STRUDEL_HEADLESS=true \
  -e STRUDEL_URL=https://strudel.cc/ \
  strudel-mcp-server
```

## Troubleshooting

### Container won't start

Check the logs:
```bash
docker compose logs -f
```

### Health check fails

Verify the container is running:
```bash
docker ps
```

Test the endpoint:
```bash
curl http://localhost:3000/health
```

### Browser automation issues

The server runs Playwright in headless mode in Docker. If you encounter browser-related errors, check that Chromium was installed successfully during the Docker build.

## Stopping the Server

```bash
docker compose down
```
