import CanvasApiRequest from './CanvasApiRequest';
import CanvasApiResponse from './CanvasApiResponse';

/**
 * Calls fetch using a CanvasApiRequest and returns a CanvasApiResponse object
 *
 * @param  {string|CanvasApiRequest} resource - A url or Canvas API request object
 * @param  {object} [init] - Settings that you want to apply to the request
 *
 * @return {CanvasApiResponse} A Canvas API resonse object
 */
export async function canvasApiFetch(resource, init = {}) {
    var request = (resource instanceof CanvasApiRequest) ? resource : new CanvasApiRequest(resource, init);

    return new CanvasApiResponse(await fetch(request));
}

/**
 * Takes any value and recursively serializes it into a valid query string
 *
 *   - Arrays will be serialized with empty brackets (e.g. `arr[]=1&arr[]=2&...`)
 *   - Objects will be serialized with their keys in brackets (e.g. `obj[foo]=bar&obj[baz]=boo&...`)
 *   - Dates will be converted to ISO 8601 format
 *
 * @param  {object} data - The data to be serialized
 * @param  {string} [prefix] - The string to prepend to all parts of the data
 *
 * @return {string} The serialized string
 */
export function buildQueryString(data, prefix) {
    var params = [];

    // Just encode primitive values if no prefix given
    if (prefix === undefined && (typeof data !== 'object' || data === null)) {
        // Encode non string primitives
        if (typeof data !== 'string') {
            return encodeURIComponent(data);
        }

        // Encode the query string parts
        return data.split('&').map(item => item.split('=').map(item => encodeURIComponent(item)).join('=')).join('&');
    }

    // Convert Date instances to ISO 8601 strings
    if (data instanceof Date) {
        data = data.toISOString();
    }

    // For primitive types, just encode
    if (typeof data !== 'object' || data === null) {
        return encodeURIComponent(prefix) + '=' + encodeURIComponent(data);
    }

    // Recursively serialize all properties of objects
    for (let key in data) {
        let name = (prefix === undefined) ? key
                 : (data instanceof Array) ? `${prefix}[]`
                 : `${prefix}[${key}]`;

        params.push(buildQueryString(data[key], name));
    }

    return params.join('&');
}
