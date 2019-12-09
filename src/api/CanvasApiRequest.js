import Cookies from 'js-cookie';
import { buildQueryString } from './buildQueryString';


export class CanvasApiRequest extends Request {

    constructor(path, { method, queryParams, data }) {
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

        super(url, init);
    }

}
