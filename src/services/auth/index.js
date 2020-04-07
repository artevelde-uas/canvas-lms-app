import api from '@artevelde-uas/canvas-lms-api';
import { routeMatch } from '../router';


export function getCourseRoles(userId = 'self') {
    let path = window.location.pathname + window.location.search;
    let { params } = routeMatch(path);

    if (!('courseId' in params)) {
        throw new Error('Function called out of course context');
    }

    let url = `/courses/${params.courseId}/enrollments`;
    let promise = api.get(url, { user_id: userId });

    return promise.then(enrollments => new Set(enrollments.map(enrollment => enrollment.role)));
}

export default {
    getCourseRoles
};
