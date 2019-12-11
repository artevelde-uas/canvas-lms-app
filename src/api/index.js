import CanvasApiRequest from './CanvasApiRequest';
import { canvasApiFetch } from './util';


/**
 * @param  {string} path - The path of the API endpoint
 * @param  {object} init - The options to initialize the request with
 *
 * @return {object|array} An object or array of objects
 */
async function request(path, init) {
    var request = new CanvasApiRequest(path, init);
    var response = await canvasApiFetch(request);

    return (response.links === null) ? response.json() : response.array();
}

/**
 * Performs a GET request to the Canvas REST API
 *
 * @param  {string} path - The path of the API endpoint
 * @param  {object} [queryParams] - The query parameters to be sent
 *
 * @return {object} A JSON object
 */
async function get(path, queryParams) {
    return request(path, {
        method: 'GET',
        queryParams
    });
}

/**
 * Performs a POST request to the Canvas REST API
 *
 * @param  {string} path - The path of the API endpoint
 * @param  {object} [data] - The JSON data to be sent
 * @param  {object} [queryParams] - The query parameters to be sent
 *
 * @return {object} A JSON object
 */
async function post(path, data, queryParams) {
    return request(path, {
        method: 'POST',
        queryParams,
        data
    });
}

/**
 * Performs a PUT request to the Canvas REST API
 *
 * @param  {string} path - The path of the API endpoint
 * @param  {object} [data] - The JSON data to be sent
 * @param  {object} [queryParams] - The query parameters to be sent
 *
 * @return {object} A JSON object
 */
async function put(path, data, queryParams) {
    return request(path, {
        method: 'PUT',
        queryParams,
        data
    });
}

/**
 * Performs a DELETE request to the Canvas REST API
 *
 * @param  {string} path - The path of the API endpoint
 * @param  {object} [queryParams] - The query parameters to be sent
 *
 * @return {object} A JSON object
 */
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
