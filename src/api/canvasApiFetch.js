import { CanvasApiResponse } from './CanvasApiResponse';


export async function canvasApiFetch(request) {
    return new CanvasApiResponse(await fetch(request));
}
