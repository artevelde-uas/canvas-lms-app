import api from '@artevelde-uas/canvas-lms-api';
import { routeMatch } from '../router';


export async function hasCourseEnrollment(enrollmentType) {
    let path = window.location.pathname + window.location.search;
    let { params } = routeMatch(path);

    if (!('courseId' in params)) {
        throw new Error('Function called out of course context');
    }

    let url = `/courses/${params.courseId}/enrollments`;
    let enrollments = await api.get(url, { user_id: 'self' });

    console.log(enrollments);

    return enrollments.some(({ type }) => (type === enrollmentType));
}
