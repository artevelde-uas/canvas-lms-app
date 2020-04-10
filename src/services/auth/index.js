import { hasCourseEnrollment } from './util';


export function isCourseStudent() {
    return hasCourseEnrollment('StudentEnrollment');
}

export function isCourseTeacher() {
    return hasCourseEnrollment('TeacherEnrollment');
}

export function isCourseTA() {
    return hasCourseEnrollment('TaEnrollment');
}

export function isCourseDesigner() {
    return hasCourseEnrollment('DesignerEnrollment');
}

export function isCourseObserver() {
    return hasCourseEnrollment('ObserverEnrollment');
}

export default {
    isCourseStudent,
    isCourseTeacher,
    isCourseTA,
    isCourseDesigner,
    isCourseObserver
};
