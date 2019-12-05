import Cookies from 'js-cookie';


function buildQueryString(data, prefix) {
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

async function request(path, { method, queryParams, data }) {
    var url = new URL('/api/v1' + path, window.location);
    var init = {
        method,
        headers: new Headers({
            'Accept': 'application/json+canvas-string-ids, application/json+canvas-string-ids, application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-CSRF-Token': Cookies.get('_csrf_token'),
            'X-Requested-With': 'XMLHttpRequest'
        })
    };

    if (queryParams) {
        url.search += ((url.search === '') ? '?' : '&') + buildQueryString(queryParams);
    }

    if (data) {
        init.body = JSON.stringify(data);
    }

    let request = new Request(url, init);
    let response = await fetch(request);
    let text = await response.text();

    return JSON.parse(text.replace(/^while\(1\);/, ''));
}

async function get(path, queryParams) {
    return request(path, {
        method: 'GET',
        queryParams
    });
}

async function post(path, data, queryParams) {
    return request(path, {
        method: 'POST',
        queryParams,
        data
    });
}

async function put(path, data, queryParams) {
    return request(path, {
        method: 'PUT',
        queryParams,
        data
    });
}

async function del(path, queryParams) {
    return request(path, {
        method: 'DELETE',
        queryParams
    });
}


export default {
    get,
    post,
    put,
    del
};
