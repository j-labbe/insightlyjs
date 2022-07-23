const https = require('https');

const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

async function nodeHttpRequest(apiKey: string, baseUrl: string, path: string, method: string, data?: any): Promise<any> {
    method = method.toUpperCase();

    if (!validMethods.includes(method)) {
        throw new Error(`InsightlyJS: Invalid method: ${method}`);
    }

    if (!data && method.toUpperCase() !== 'GET') {
        throw new Error('Data must be provided for non-GET requests');
    }

    if (baseUrl.charAt(baseUrl.length - 1) === '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }

    const options = {
        hostname: baseUrl,
        port: 443,
        path: `/${path}`,
        method: method,
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    };

    const response = await https.request(options);

    return response.body;
}

async function get(apiKey: string, baseUrl: string, path: string): Promise<any> {
    return nodeHttpRequest(apiKey, baseUrl, path, 'GET');
}

async function put(apiKey: string, baseUrl: string, path: string, data: any): Promise<any> {
    return nodeHttpRequest(apiKey, baseUrl, path, 'PUT', data);
}

async function post(apiKey: string, baseUrl: string, path: string, data: any): Promise<any> {
    return nodeHttpRequest(apiKey, baseUrl, path, 'POST', data);
}

async function del(apiKey: string, baseUrl: string, path: string): Promise<any> {
    return nodeHttpRequest(apiKey, baseUrl, path, 'DELETE');
}

export { get, put, post, del };
