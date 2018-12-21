import Cookies from 'js-cookie';


function ajax(path, method, params) {
    var url = '/api/v1' + path;
    var init = {
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-CSRF-Token': Cookies.get('_csrf_token')
        })
    };

    if (method) {
        init.method = method;
    }

    if (params) {
        init.body = new URLSearchParams(params);
    }
    
    return fetch(url, init)
        .then(response => response.text())
        .then(data => data.replace(/^while\(1\);/, ''))
        .then(data => JSON.parse(data));
}

function get(path, params) {
    return ajax(path, 'GET', params);
}

function post(path, params) {
    return ajax(path, 'POST', params);
}

function put(path, params) {
    return ajax(path, 'PUT', params);
}

function del(path, params) {
    return ajax(path, 'DELETE', params);
}


export default {
    get,
    post,
    put,
    del
};
