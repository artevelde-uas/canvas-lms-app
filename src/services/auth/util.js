import api from '@artevelde-uas/canvas-lms-api';
import { routeMatch } from '../router';


let enrollmentTypes;

/**
 * Determines if the user is enrolled as the given enrollment type in the current course
 * 
 * @param {string} enrollmentType The enrollment type to test
 * @returns {boolean} TRUE if the user is enrolled as the given type, FALSE otherwise
 */
export async function hasCourseEnrollment(enrollmentType) {
    let path = window.location.pathname + window.location.search;
    let { params } = routeMatch(path);

    if (!('courseId' in params)) {
        throw new Error('Function called out of course context');
    }

    // Cache the enrollment types
    if (enrollmentTypes === undefined) {
        let url = `/courses/${params.courseId}/enrollments`;
        let enrollments = await api.get(url, { user_id: 'self' });

        enrollmentTypes = new Set(enrollments.map(({ type }) => type));
    }

    return enrollmentTypes.has(enrollmentType);
}
