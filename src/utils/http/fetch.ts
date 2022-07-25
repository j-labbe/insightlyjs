async function baseFetch(url: string, options: any): Promise<any> {
    return fetch(url, options).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(response.statusText);
        }
    });
}

async function get (apiKey: string, apiUrl: string, path: string) {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    });
}

async function post (apiKey: string, apiUrl: string, path: string, data: JSON) {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "POST",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
        body: data
    });
}

async function put (apiKey: string, apiUrl: string, path: string, data: JSON) {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "PUT",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
        body: data
    });
}

async function del (apiKey: string, apiUrl: string, path: string) {
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        }
    });
}

export { get, post, put, del };