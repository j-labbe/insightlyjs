import Base64 from '../base64';
import * as fetch from './fetch';

class InsightlyHTTPRequest {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(apiKey: string, baseUrl: string) {
        this.baseUrl = baseUrl;

        /**
         * The Insightly API key must be passed in to the constructor
         *
         * Insightly requires the api key to be encoded in base64 when sent in the Authorization header
         */
        this.apiKey = Base64.encode(apiKey);
    }

    async get (path: string): Promise<any> {
        return await fetch.get(this.apiKey, this.baseUrl, path);
    }

    async put (path: string, data: any): Promise<any> {
        return await fetch.put(this.apiKey, this.baseUrl, path, data);
    }

    async post (path: string, data: any): Promise<any> {
        return await fetch.post(this.apiKey, this.baseUrl, path, data);
    }

    async delete (path: string): Promise<any> {
        return await fetch.del(this.apiKey, this.baseUrl, path);
    }
    
}

export default InsightlyHTTPRequest;
