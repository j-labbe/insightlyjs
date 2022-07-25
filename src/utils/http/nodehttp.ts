import { IncomingMessage } from 'http';
const https = require('https');

interface NodeHttpOptions {
    host: string;
    path: string;
    method: string;
    headers: {
        Authorization: string;
        'Accepts-Encoding': string;
    };
}

function request(options: NodeHttpOptions, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res: IncomingMessage) => {
            let body: any = '',
                statusCode = res.statusCode || 500; // will reject if not explicitly set as OK

            res.on('data', (chunk: any) => {
                body += chunk;
            })
                .on('end', () => {
                    if (statusCode >= 200 && statusCode < 300) {
                        return resolve(JSON.parse(body));
                    } else {
                        return reject(JSON.parse(body));
                    }
                })
                .on('error', (err: any) => {
                    return reject(err);
                })
                .on('timeout', () => {
                    return reject(new Error('Timeout'));
                })
        });
        if (data) {
            req.write(data);
        }
        req.end();
    });
}

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

    baseUrl = baseUrl.replace(/(^\w+:|^)\/\//, '');

    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }

    const options = {
        host: baseUrl,
        path: `/v3.1/${path}`,
        method: method,
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    };

    const response = await request(options, data);

    return response;
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
