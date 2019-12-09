export function buildQueryString(data, prefix) {
    var params = [];

    // Just encode primitive values if no prefix given
    if (prefix === undefined && (typeof data !== 'object' || data === null)) {
        // Encode non strings primitives
        if (typeof data !== 'string') {
            return encodeURIComponent(data);
        }

        // Encode the query string parts
        return data.split('&').map(item => item.split('=').map(item => encodeURIComponent(item)).join('=')).join('&');
    }

    // Convert Date instances to ISO strings
    if (data instanceof Date) {
        data = data.toISOString();
    }

    // For primitive types, just encode
    if (typeof data !== 'object' || data === null) {
        return encodeURIComponent(prefix) + '=' + encodeURIComponent(data);
    }

    // Recursively serialize all properties of objects
    for (let key in data) {
        let name = (prefix === undefined)
            ? key
            : (data instanceof Array)
                ? `${prefix}[]`
                : `${prefix}[${key}]`;

        params.push(buildQueryString(data[key], name));
    }

    return params.join('&');
}
