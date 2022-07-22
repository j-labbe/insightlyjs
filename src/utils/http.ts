import Base64 from './base64';

class InsightlyHTTPRequest {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(apiKey: string) {
        this.baseUrl = 'https://api.na1.insightly.com/3.1';

        /**
         * The Insightly API key must be passed in to the constructor
         *
         * Insightly requires the api key to be encoded in base64 when sent in the Authorization header
         */
        this.apiKey = Base64.encode(apiKey);
    }

    /**
     * @param path The path to the endpoint. Can either omit or include the base "/"
     * @returns Data from the endpoint
     */
    public async get(path: string): Promise<any> {
        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        const xmlHttp = new XMLHttpRequest();
        // Basic Authorization is the only way of authentication for Insightly
        xmlHttp.setRequestHeader('Authorization', `Basic ${this.apiKey}`);

        // Insightly requires Accepts-Encoding to be set to gzip
        xmlHttp.setRequestHeader('Accepts-Encoding', 'gzip');

        // If
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
        xmlHttp.open('GET', `${this.baseUrl}/${path}`, true);
        xmlHttp.send(null);
    }

    public async put(path: string, data: any): Promise<any> {
        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        const xmlHttp = new XMLHttpRequest();
        // Basic Authorization is the only way of authentication for Insightly
        xmlHttp.setRequestHeader('Authorization', `Basic ${this.apiKey}`);

        // Insightly requires Accepts-Encoding to be set to gzip
        xmlHttp.setRequestHeader('Accepts-Encoding', 'gzip');

        // If
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
        xmlHttp.open('PUT', `${this.baseUrl}/${path}`, true);
        xmlHttp.send(data);
    }

    public async delete(path: string): Promise<boolean> {
        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        const xmlHttp = new XMLHttpRequest();
        // Basic Authorization is the only way of authentication for Insightly
        xmlHttp.setRequestHeader('Authorization', `Basic ${this.apiKey}`);

        // Insightly requires Accepts-Encoding to be set to gzip
        xmlHttp.setRequestHeader('Accepts-Encoding', 'gzip');

        // If
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 202) {
                return Promise.resolve(true);
            } else {
                if (xmlHttp.readyState === 4) {
                    switch (xmlHttp.status) {
                        // TODO: decide whether to return false or reject the promise
                        case 400:
                            console.error('InsightlyJS Error: 400 - Often missing or invalid parameter(s)');
                            return false;
                        case 401:
                            console.error('InsightlyJS Error: 401 - Authentication failed');
                            return false;
                        case 404:
                            console.error('InsightlyJS Error: 404 - Resource not found');
                            return false;
                        case 417:
                            console.error('InsightlyJS Error: 417 - Delete failed');
                            return false;
                        default:
                            return Promise.reject(new Error('InsightlyJS Error: ' + xmlHttp.status + ' - ' + xmlHttp.statusText));
                    }
                }
            }
        };
        // Send the request asynchronously
        xmlHttp.open('DELETE', `${this.baseUrl}/${path}`, true);
        xmlHttp.send(null);

        return false;
    }

    public async post(path: string, data: any): Promise<any> {
        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        const xmlHttp = new XMLHttpRequest();
        // Basic Authorization is the only way of authentication for Insightly
        xmlHttp.setRequestHeader('Authorization', `Basic ${this.apiKey}`);

        // Insightly requires Accepts-Encoding to be set to gzip
        xmlHttp.setRequestHeader('Accepts-Encoding', 'gzip');

        // If
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
        xmlHttp.open('POST', `${this.baseUrl}/${path}`, true);
        xmlHttp.send(data);
    }
}

export default InsightlyHTTPRequest;
