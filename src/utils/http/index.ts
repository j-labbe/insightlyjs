import Base64 from '../base64';
import * as fetch from './fetch';

class InsightlyHTTPRequest {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    public countTotal?: boolean;

    constructor(apiKey: string, baseUrl: string, countTotal?: boolean) {
        if (!apiKey) {
            throw new Error('API key is required');
        }

        if (!baseUrl) {
            throw new Error('Base URL is required');
        }

        this.baseUrl = baseUrl;

        /**
         * The Insightly API key must be passed in to the constructor
         *
         * Insightly requires the api key to be encoded in base64 when sent in the Authorization header
         */
        this.apiKey = Base64.encode(apiKey);

        this.countTotal = !!countTotal;
    }

    async get(path: string): Promise<any> {
        return await fetch.get(this.apiKey, this.baseUrl, path, this.countTotal);
    }

    async put(path: string, data: any): Promise<any> {
        return await fetch.put(this.apiKey, this.baseUrl, path, data);
    }

    async post(path: string, data: any): Promise<any> {
        return await fetch.post(this.apiKey, this.baseUrl, path, data);
    }

    async delete(path: string): Promise<any> {
        return await fetch.del(this.apiKey, this.baseUrl, path);
    }
}

export async function getLatestVersion(): Promise<number> {
    // fetch the latest version from npm and return it
    const data = await fetch.baseFetch('https://registry.npmjs.org/insightlyjs', {}, false);
    //@ts-ignore
    const latestVersion = data['dist-tags']?.latest;
    return latestVersion;
}

export default InsightlyHTTPRequest;
