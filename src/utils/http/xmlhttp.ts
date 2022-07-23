
const validMethods = ['GET', 'PUT', 'POST', 'DELETE'];

/**
 * @param apiKey The Insightly API key
 * @param baseUrl Insightly API url
 * @param path API endpoint
 * @param method HTTP request method
 * @param data (optional) data to send in the request body
 */
async function basicXmlHttpRequest (apiKey: string, baseUrl: string, path: string, method: string, data?: any): Promise<any> {

    method = method.toUpperCase();

    if (!validMethods.includes(method)) {
        throw new Error('InsightlyJS Error: Invalid http request method');
    }

    if (method.toUpperCase() !== 'GET') {
        if (!data) {
            throw new Error('InsightlyJS Error: Data required for non-GET requests');
        }
    } else {
        data = null;
    }

    if (baseUrl.charAt(baseUrl.length - 1) === '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }

    const xmlHttp = new XMLHttpRequest();
    // Basic Authorization is the only way of authentication for Insightly
    xmlHttp.setRequestHeader('Authorization', `Basic ${apiKey}`);

    // Insightly requires Accepts-Encoding to be set to gzip
    xmlHttp.setRequestHeader('Accepts-Encoding', 'gzip');

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            return Promise.resolve(xmlHttp.response);
        } else {
            if (xmlHttp.readyState === 4) {
                switch (xmlHttp.status) {
                    case 400:
                        return Promise.reject(new Error('InsightlyJS Error: 400 - Often missing or invalid parameter(s)'));
                    case 401:
                        return Promise.reject(new Error('InsightlyJS Error: 401 - Authentication failed'));
                    case 404:
                        return Promise.reject(new Error('InsightlyJS Error: 404 - Resource not found'));
                    default:
                        return Promise.reject(new Error('InsightlyJS Error: ' + xmlHttp.status + ' - ' + xmlHttp.statusText));
                }
            }
        }
    };
    // Send the request asynchronously
    xmlHttp.open(method, `${baseUrl}/${path}`, true);
    xmlHttp.send(data);
}

/**
 * @param apiKey The Insightly API key
 * @param baseUrl Insightly API url
 * @param path Insightly API endpoint
 */
async function get(apiKey: string, baseUrl: string, path: string): Promise<any> {
    return await basicXmlHttpRequest(apiKey, baseUrl, path, 'GET');
}

/**
 * @param apiKey The Insightly API key
 * @param baseUrl Insightly API url
 * @param path Insightly API endpoint
 * @param data (optional) data to send in the request body
 */
async function post(apiKey: string, baseUrl: string, path: string, data: any): Promise<any> {
    return await basicXmlHttpRequest(apiKey, baseUrl, path, 'POST', data);
}

/**
 * @param apiKey The Insightly API key
 * @param baseUrl Insightly API url
 * @param path Insightly API endpoint
 * @param data (optional) data to send in the request body
 */
async function put(apiKey: string, baseUrl: string, path: string, data: any): Promise<any> {
    return await basicXmlHttpRequest(apiKey, baseUrl, path, 'PUT', data);
}

/**
 * @param apiKey The Insightly API key
 * @param baseUrl Insightly API url
 * @param path Insightly API endpoint
 */
async function del(apiKey: string, baseUrl: string, path: string): Promise<any> {
    return await basicXmlHttpRequest(apiKey, baseUrl, path, 'DELETE');
}

export { get, put, del, post };