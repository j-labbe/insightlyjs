interface UrlParam {
    [key: string]: any;
}

/**
 * @param params List of objects containing the parameters to be included in the URL
 * @returns string with "?" prepended
 * @example ```ts
 * const params = buildUrlParams({ skip: 10 }, { top: 20 }, { count_total: true });
 * console.log(params);
 * // returns "?skip=10&top=20&count_total=true"
 * ```
 */
function buildUrlParams(...params: UrlParam[]): string {
    // filter out falsy values from the array of UrlParam[]
    const filteredParams = params.filter((param: UrlParam) => {
        // there is only one key-value pair in the object
        const key: any = Object.keys(param)[0];
        const value: any = param[key];

        if (key === 'undefined' || key === 'null' || key === 'NaN' || key === 'false' || (!key && key !== 0 && key !== false)) {
            return false;
        }

        if (value === 'null' || value === 'undefined' || value === 'NaN' || (!value && value !== 0 && value !== false)) {
            return false;
        }

        // both key and value are valid
        return true;
    });

    // if there are no params, return an empty string
    if (filteredParams.length === 0) {
        return '';
    }

    // if there is only one param, return the key-value pair
    if (filteredParams.length === 1) {
        const key = Object.keys(filteredParams[0])[0];
        const value = filteredParams[0][key];
        return `?${key}=${value}`;
    }

    // if there are multiple params, return a string of key-value pairs
    const paramsString = filteredParams.map((param: UrlParam) => {
        const key = Object.keys(param)[0];
        const value = param[key];
        return `${key}=${value}`;
    });

    // https://jsperf.com/prepend-text-to-string/1
    return '?' + paramsString.join('&');
}

export default buildUrlParams;
