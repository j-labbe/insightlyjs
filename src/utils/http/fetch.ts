async function baseFetch(url: string, options: any, countTotal?: boolean): Promise<any> {
    
    return await fetch(url, options).then(async (response) => {
        if (response.status >= 200 && response.status < 300) {

            if (options.method === 'DELETE') {
                return true;
            }
            if (countTotal) {
                //@ts-ignore - this is always a number if countTotal is passed in
                return parseInt(response.headers.get("content-length"));
            }

            return await response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
}

async function get(apiKey: string, apiUrl: string, path: string, countTotal?: boolean): Promise<any> {
    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }

    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    }, countTotal);
}

async function post(apiKey: string, apiUrl: string, path: string, data: JSON): Promise<any> {
    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
        body: data,
    });
}

async function put(apiKey: string, apiUrl: string, path: string, data: JSON): Promise<any> {
    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: 'PUT',
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
            ContentType: 'application/json',
        },
        body: data,
    });
}

async function del(apiKey: string, apiUrl: string, path: string): Promise<boolean> {
    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }
    return await baseFetch(`${apiUrl}/v3.1/${path}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${apiKey}`,
            'Accepts-Encoding': 'gzip',
        },
    });
}

export { get, post, put, del };
