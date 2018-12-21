import Route from 'route-parser';
import EventEmitter from 'events';


const emitter = new EventEmitter();


const routes = {
    'dashboard': new Route('/'),
    
    'courses': new Route('/courses'),
    'courses.home': new Route('/courses/:courseId'),
    'courses.announcements': new Route('/courses/:courseId/announcements'),
    'courses.announcements.new': new Route('/courses/:courseId/discussion_topics/new?is_announcement=true'),
    'courses.discussions': new Route('/courses/:courseId/discussion_topics'),
    'courses.gradebook': new Route('/courses/:courseId/gradebook'),
    'courses.grades': new Route('/courses/:courseId/grades'),
    'courses.outcomes': new Route('/courses/:courseId/outcomes'),
    'courses.quizzes': new Route('/courses/:courseId/quizzes'),
    'courses.pages': new Route('/courses/:courseId/pages'),
    'courses.pages.home': new Route('/courses/:courseId/wiki'),
    'courses.pages.view': new Route('/courses/:courseId/pages/:pageSlug'),
    'courses.pages.edit': new Route('/courses/:courseId/pages/:pageSlug/edit'),
    'courses.pages.revisions': new Route('/courses/:courseId/pages/:pageSlug/revisions'),
    'courses.modules': new Route('/courses/:courseId/modules'),
    'courses.syllabus': new Route('/courses/:courseId/assignments/syllabus'),
    'courses.assignments': new Route('/courses/:courseId/assignments'),
    'courses.conferences': new Route('/courses/:courseId/conferences'),
    'courses.collaborations': new Route('/courses/:courseId/lti_collaborations'),
    'courses.users': new Route('/courses/:courseId/users'),
    'courses.settings': new Route('/courses/:courseId/settings'),
    'courses.settings.statistics': new Route('/courses/:courseId/statistics'),
    'courses.settings.confirm-conclude': new Route('/courses/:courseId/confirm_action?event=conclude'),
    'courses.settings.confirm-delete': new Route('/courses/:courseId/confirm_action?event=delete'),
    'courses.settings.copy': new Route('/courses/:courseId/copy'),
    'courses.settings.import': new Route('/courses/:courseId/content_migrations'),
    'courses.settings.export': new Route('/courses/:courseId/content_export'),
    'courses.external-tool': new Route('/courses/:courseId/external_tools/:toolId'),
    
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
