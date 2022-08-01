const nodeFetch = require('node-fetch');

if (!globalThis.fetch) {
    globalThis.fetch = nodeFetch;
}