import CanvasApiRequest from './CanvasApiRequest';
import { canvasApiFetch } from './util';


async function request(path, init) {
    var request = new CanvasApiRequest(path, init);
    var response = await canvasApiFetch(request);
    var json = await response.json();

    return json;
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
