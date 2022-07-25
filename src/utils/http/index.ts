import Base64 from '../base64';
import * as xmlHttp from './xmlhttp';
import * as nodehttp from './nodehttp';
import isNode from '../isNode';

class InsightlyHTTPRequest {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private readonly runningOnNode: boolean;

    constructor(apiKey: string, baseUrl: string) {
        this.baseUrl = baseUrl;

        /**
         * The Insightly API key must be passed in to the constructor
         *
         * Insightly requires the api key to be encoded in base64 when sent in the Authorization header
         */
        this.apiKey = Base64.encode(apiKey);

        /**
         * Whether this is running on a NodeJS environment or not is important because
         * the request method for browsers and node is different. We will dynamically
         * load the appropriate method based on the environment.
         */
        this.runningOnNode = isNode();
        
        // jest - testxmlhttp
        // this.runningOnNode = false;
    }

    async get (path: string): Promise<any> {
        if (this.runningOnNode) {
            return await nodehttp.get(this.apiKey, this.baseUrl, path);
        } else {
            return await xmlHttp.get(this.apiKey, this.baseUrl, path);
        }
    }

    async put (path: string, data: any): Promise<any> {
        if (this.runningOnNode) {
            return await nodehttp.put(this.apiKey, this.baseUrl, path, data);
        } else {
            return await xmlHttp.put(this.apiKey, this.baseUrl, path, data);
        }
    }

    async post (path: string, data: any): Promise<any> {
        if (this.runningOnNode) {
            return await nodehttp.post(this.apiKey, this.baseUrl, path, data);
        } else {
            return await xmlHttp.post(this.apiKey, this.baseUrl, path, data);
        }
    }

    async delete (path: string): Promise<any> {
        if (this.runningOnNode) {
            return await nodehttp.del(this.apiKey, this.baseUrl, path);
        } else {
            return await xmlHttp.del(this.apiKey, this.baseUrl, path);
        }
    }
    
}

export default InsightlyHTTPRequest;
