import Route from 'route-parser';
import EventEmitter from 'events';


const emitter = new EventEmitter();


const routes = {
    'dashboard': new Route('/'),
    
    'courses': new Route('/courses'),
    'course.home': new Route('/courses/:courseId'),
    'course.announcements': new Route('/courses/:courseId/announcements'),
    'course.announcements.new': new Route('/courses/:courseId/discussion_topics/new?is_announcement=true'),
    'course.discussions': new Route('/courses/:courseId/discussion_topics'),
    'course.gradebook': new Route('/courses/:courseId/gradebook'),
    'course.grades': new Route('/courses/:courseId/grades'),
    'course.outcomes': new Route('/courses/:courseId/outcomes'),
    'course.quizzes': new Route('/courses/:courseId/quizzes'),
    'course.pages': new Route('/courses/:courseId/pages'),
    'course.pages.home': new Route('/courses/:courseId/wiki'),
    'course.pages.view': new Route('/courses/:courseId/pages/:pageSlug'),
    'course.pages.edit': new Route('/courses/:courseId/pages/:pageSlug/edit'),
    'course.pages.revisions': new Route('/courses/:courseId/pages/:pageSlug/revisions'),
    'course.modules': new Route('/courses/:courseId/modules'),
    'course.syllabus': new Route('/courses/:courseId/assignments/syllabus'),
    'course.assignments': new Route('/courses/:courseId/assignments'),
    'course.conferences': new Route('/courses/:courseId/conferences'),
    'course.collaborations': new Route('/courses/:courseId/lti_collaborations'),
    'course.users': new Route('/courses/:courseId/users'),
    'course.settings': new Route('/courses/:courseId/settings'),
    'course.settings.statistics': new Route('/courses/:courseId/statistics'),
    'course.settings.confirm-conclude': new Route('/courses/:courseId/confirm_action?event=conclude'),
    'course.settings.confirm-delete': new Route('/courses/:courseId/confirm_action?event=delete'),
    'course.settings.copy': new Route('/courses/:courseId/copy'),
    'course.settings.import': new Route('/courses/:courseId/content_migrations'),
    'course.settings.export': new Route('/courses/:courseId/content_export'),
    'course.external-tool': new Route('/courses/:courseId/external_tools/:toolId'),
    
    'profile.home': new Route('/profile'),
    'profile.communication': new Route('/profile/communication'),
    'profile.settings': new Route('/profile/settings'),
    'profile.files': new Route('/files')
};


function match(path) {
    let match;
    let [name] = Object.entries(routes).find(([, route]) => (match = route.match(path))) || [];
    
    if (name === undefined) return;
    
    return {
        name,
        params: match || {}
    }
}


export default {
    match
}
