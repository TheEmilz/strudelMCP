import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';

describe('Streamable HTTP Transport Support', () => {
  it('should be able to import StreamableHTTPServerTransport', () => {
    assert.ok(StreamableHTTPServerTransport, 'StreamableHTTPServerTransport should be importable');
    assert.equal(typeof StreamableHTTPServerTransport, 'function');
  });

  it('should create a stateful StreamableHTTPServerTransport instance', () => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => 'test-session-id',
    });

    assert.ok(transport, 'Transport should be created');
    assert.equal(typeof transport.handleRequest, 'function', 'Should have handleRequest method');
    assert.equal(typeof transport.close, 'function', 'Should have close method');
    assert.equal(typeof transport.send, 'function', 'Should have send method');
    assert.equal(typeof transport.start, 'function', 'Should have start method');
  });

  it('should create a stateless StreamableHTTPServerTransport instance', () => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    assert.ok(transport, 'Transport should be created');
    assert.equal(transport.sessionId, undefined, 'Session ID should be undefined in stateless mode');
  });

  it('should have isInitializeRequest utility available', () => {
    assert.equal(typeof isInitializeRequest, 'function', 'isInitializeRequest should be a function');

    // Test with a valid initialize request
    const validInit = {
      jsonrpc: '2.0',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'test', version: '1.0.0' },
      },
      id: 1,
    };
    assert.equal(isInitializeRequest(validInit), true, 'Should recognize valid initialize request');

    // Test with non-initialize request
    const toolCall = {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: { name: 'strudel_init', arguments: {} },
      id: 2,
    };
    assert.equal(isInitializeRequest(toolCall), false, 'Should reject non-initialize request');
  });

  it('should support CORS-compatible configuration for browser clients', () => {
    // Verify that the transport can be configured with options suitable
    // for browser-based access (e.g. Chrome webMCP)
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => 'browser-session',
      enableJsonResponse: false,
    });

    assert.ok(transport, 'Transport with browser-compatible config should be created');
  });
});
