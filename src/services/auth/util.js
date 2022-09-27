import api from '@artevelde-uas/canvas-lms-api';
import { routeMatch } from '../router';


var enrollmentTypes;

async function getEnrollmentTypes(courseId) {
    // Cache the enrollment types
    if (enrollmentTypes === undefined) {
        const url = `/courses/${courseId}/enrollments`;
        const enrollments = await api.get(url, { user_id: 'self' });

        enrollmentTypes = new Set(enrollments.map(({ type }) => type));
    }

    return enrollmentTypes;
}

/**
 * Determines if the user is enrolled as the given enrollment type in the current course
 * 
 * @param {string} enrollmentType The enrollment type to test
 * @returns {boolean} TRUE if the user is enrolled as the given type, FALSE otherwise
 */
export async function hasCourseEnrollment(enrollmentType) {
    const path = window.location.pathname + window.location.search;
    const { params } = routeMatch(path);

    if (!('courseId' in params)) {
        throw new Error('Function called out of course context');
    }

    const enrollmentTypes = await getEnrollmentTypes(params.courseId);

    return enrollmentTypes.has(enrollmentType);
}
