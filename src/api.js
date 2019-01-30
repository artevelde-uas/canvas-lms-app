import Cookies from 'js-cookie';


function buildQueryString(data, prefix) {
    var params = [];
    
    if (typeof data !== 'object' || data === null) {
        return encodeURIComponent(prefix) + '=' + encodeURIComponent(value);
    }
    
    for (let key in data) {
        let name = (prefix === undefined)
            ? key
            : (data instanceof Array && typeof data[key] !== 'object')
            ? `${prefix}[]`
            : `${prefix}[${key}]`;

        params.push(buildQueryString(data[key], name));
    }
    
    return params.join('&');
}

function ajax(method, path, data, queryParams) {
    var url = '/api/v1' + path;
    var init = {
        method,
        headers: new Headers({
            'Accept': 'application/json+canvas-string-ids, application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
            'X-CSRF-Token': Cookies.get('_csrf_token'),
            'X-Requested-With': 'XMLHttpRequest'
        })
    };

    if (data) {
        init.body = JSON.stringify(data);
    }

    if (queryParams) {
        url += '?' + buildQueryString(queryParams);
    }
    
    return fetch(url, init)
        .then(response => response.text())
        .then(data => data.replace(/^while\(1\);/, ''))
        .then(data => JSON.parse(data));
}

function get(path, queryParams) {
    return ajax('GET', path, queryParams);
}

function post(path, data, queryParams) {
    return ajax('POST', path, data, queryParams);
}

function put(path, data, queryParams) {
    return ajax('PUT', path, data, queryParams);
}

function del(path, queryParams) {
    return ajax('DELETE', path, queryParams);
}


export default {
    get,
    post,
    put,
    del
};
