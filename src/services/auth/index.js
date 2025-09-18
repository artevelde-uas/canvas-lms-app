import { hasCourseEnrollment } from './util';


function hasUserRole(role) {
    return ENV.current_user_roles.includes(role);
}

/**
 * Determines if the user is currently using the student role
 * 
 * @returns {boolean} TRUE if the user is a student, FALSE otherwise
 */
export function isStudent() {
    return (
        ENV !== undefined && (
            ENV.current_user_is_student || (
                Array.isArray(ENV.current_user_roles) &&
                ENV.current_user_roles.includes('fake_student')
            )
        )
    );
}

/**
 * Determines if the user is currently using the student view
 * 
 * @returns {boolean} TRUE if the user is in student view, FALSE otherwise
 */
export function isStudentView() {
    return (
        ENV !== undefined && (
            Array.isArray(ENV.current_user_roles) &&
            ENV.current_user_roles.includes('fake_student')
        )
    );
}

/**
 * Determines if the user is a teacher
 * 
 * @returns {boolean} TRUE if the user is a teacher, FALSE otherwise
 */
export function isTeacher() {
    return (
        ENV !== undefined && (
            Array.isArray(ENV.current_user_roles) &&
            ENV.current_user_roles.includes('teacher')
        )
    );
}

/**
 * Determines if the user is an observer
 * 
 * @returns {boolean} TRUE if the user is an observer, FALSE otherwise
 */
export function isObserver() {
    return (
        ENV !== undefined && (
            Array.isArray(ENV.current_user_roles) &&
            ENV.current_user_roles.includes('observer')
        )
    );
}

/**
 * Determines if the user is an administrator
 * 
 * @returns {boolean} TRUE if the user is an administrator, FALSE otherwise
 */
export function isAdmin() {
    return (
        ENV !== undefined && (
            ENV.current_user_is_admin || (
                Array.isArray(ENV.current_user_roles) &&
                ENV.current_user_roles.some(role => (
                    role === 'admin' ||
                    role === 'root_admin'
                ))
            )
        )
    );
}

/**
 * Determines if the user is an administrator on the root account
 * 
 * @returns {boolean} TRUE if the user is a root administrator, FALSE otherwise
 */
export function isRootAdmin() {
    return (
        ENV !== undefined && (
            Array.isArray(ENV.current_user_roles) &&
            ENV.current_user_roles.includes('root_admin')
        )
    );
}

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


export default {
    isStudent,
    isTeacher,
    isObserver,
    isAdmin,
    isCourseStudent,
    isCourseTeacher,
    isCourseTA,
    isCourseDesigner,
    isCourseObserver,
    hasUserRole,
    hasCourseEnrollment
};
