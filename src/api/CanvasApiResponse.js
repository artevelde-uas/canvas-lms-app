/**
 * Extends normal Response object
 *
 *   - The result has "while(1);" prepended which will be stripped
 */
export default class CanvasApiResponse extends Response {

    constructor(response) {
        super(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });
    }

    async text() {
        return (await super.text()).replace(/^while\(1\);/, '');
    }

    async json() {
        return JSON.parse(await this.text());
    }

}
