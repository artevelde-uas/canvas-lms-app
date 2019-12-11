import Cookies from 'js-cookie';
import { buildQueryString } from './util';

/**
 * Extends normal Request object
 *
 *   - Extra required headers will be added for the Canvas REST API
 *   - The query parameters will be correctly serialized
 */
export default class CanvasApiRequest extends Request {

    constructor(path, { method, queryParams, data } = {}) {
        var url = new URL('/api/v1' + path, window.location);
        var init = {
            method,
            // Add headers required for the Canvas REST API
            headers: new Headers({
                'Accept': 'application/json+canvas-string-ids, application/json+canvas-string-ids, application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRF-Token': Cookies.get('_csrf_token'),
                'X-Requested-With': 'XMLHttpRequest'
            })
        };

        // Add the serialized query parameters to the url
        if (queryParams) {
            url.search += ((url.search === '') ? '?' : '&') + buildQueryString(queryParams);
        }

        // Convert the data to JSON string
        if (data) {
            init.body = JSON.stringify(data);
        }

        super(url, init);
    }

}
