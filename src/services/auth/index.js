import { hasCourseEnrollment } from './util';


/**
 * Determines if the user is enrolled as a student in the current course
 * 
 * @returns {boolean} TRUE if the user is enrolled as a student, FALSE otherwise
 */
export function isCourseStudent() {
    return hasCourseEnrollment('StudentEnrollment');
}

/**
 * Determines if the user is enrolled as a teacher in the current course
 * 
 * @returns {boolean} TRUE if the user is enrolled as a teacher, FALSE otherwise
 */
export function isCourseTeacher() {
    return hasCourseEnrollment('TeacherEnrollment');
}

/**
 * Determines if the user is enrolled as a teaching assistent in the current course
 * 
 * @returns {boolean} TRUE if the user is enrolled as a teaching assistent, FALSE otherwise
 */
export function isCourseTA() {
    return hasCourseEnrollment('TaEnrollment');
}

/**
 * Determines if the user is enrolled as a course designer in the current course
 * 
 * @returns {boolean} TRUE if the user is enrolled as a course designer, FALSE otherwise
 */
export function isCourseDesigner() {
    return hasCourseEnrollment('DesignerEnrollment');
}

/**
 * Determines if the user is enrolled as a course observer in the current course
 * 
 * @returns {boolean} TRUE if the user is enrolled as a course observer, FALSE otherwise
 */
export function isCourseObserver() {
    return hasCourseEnrollment('ObserverEnrollment');
}

/**
 * Determines if the user is an administrator
 * 
 * @returns {boolean} TRUE if the user is an administrator, FALSE otherwise
 */
export function isAdmin() {
    return (
        ENV !== undefined &&
        Array.isArray(ENV.current_user_roles) &&
        ENV.current_user_roles.some(role => (
            role === 'admin' ||
            role === 'root_admin'
        ))
    );
}

export default {
    isCourseStudent,
    isCourseTeacher,
    isCourseTA,
    isCourseDesigner,
    isCourseObserver,
    isAdmin
};
