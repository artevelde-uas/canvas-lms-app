import Cookies from 'js-cookie';


function ajax(method, path, params) {
    var url = '/api/v1' + path;
    var init = {
        method,
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'X-CSRF-Token': Cookies.get('_csrf_token')
        })
    };
    
    if (params) {
        init.body = JSON.stringify(params);
    }
    
    return fetch(url, init)
        .then(response => response.text())
        .then(data => data.replace(/^while\(1\);/, ''))
        .then(data => JSON.parse(data));
}

function get(path, params) {
    return ajax('GET', path, params);
}

function post(path, params) {
    return ajax('POST', path, params);
}

function put(path, params) {
    return ajax('PUT', path, params);
}

function del(path, params) {
    return ajax('DELETE', path, params);
}


export default {
    get,
    post,
    put,
    del
};
