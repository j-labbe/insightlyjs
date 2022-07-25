async function baseFetch(url: string, options: any): Promise<any> {
    return await fetch(url, options).then(async (response) => {
        if (response.status >= 200 && response.status < 300) {
            if (options.method === "DELETE") {
                return true;
            }
            return await response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
}

async function get (apiKey: string, apiUrl: string, path: string): Promise<any> {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    });
}

async function post (apiKey: string, apiUrl: string, path: string, data: JSON): Promise<any> {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "POST",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
        body: data
    });
}

async function put (apiKey: string, apiUrl: string, path: string, data: JSON): Promise<any> {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "PUT",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
            ContentType: 'application/json'
        },
        body: data
    });
}

async function del (apiKey: string, apiUrl: string, path: string): Promise<boolean> {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        }
    });
}

export { get, post, put, del };