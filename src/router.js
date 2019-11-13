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
    'courses.discussions.new': new Route('/courses/:courseId/discussion_topics/new'),
    'courses.discussions.view': new Route('/courses/:courseId/discussion_topics/:topicId'),
    'courses.discussions.edit': new Route('/courses/:courseId/discussion_topics/:topicId/edit'),
    'courses.gradebook': new Route('/courses/:courseId/gradebook'),
    'courses.gradebook.history': new Route('/courses/:courseId/gradebook/history'),
    'courses.gradebook.upload': new Route('/courses/:courseId/gradebook_upload/new'),
    'courses.grades': new Route('/courses/:courseId/grades'),
    'courses.outcomes': new Route('/courses/:courseId/outcomes'),
    'courses.quizzes': new Route('/courses/:courseId/quizzes'),
    'courses.quizzes.edit': new Route('/courses/:courseId/quizzes/:quizzId/edit'),
    'courses.pages': new Route('/courses/:courseId/pages'),
    'courses.pages.home': new Route('/courses/:courseId/wiki'),
    'courses.pages.view': new Route('/courses/:courseId/pages/:pageSlug'),
    'courses.pages.edit': new Route('/courses/:courseId/pages/:pageSlug/edit'),
    'courses.pages.revisions': new Route('/courses/:courseId/pages/:pageSlug/revisions'),
    'courses.modules': new Route('/courses/:courseId/modules'),
    'courses.syllabus': new Route('/courses/:courseId/assignments/syllabus'),
    'courses.files': new Route('/courses/:courseId/files'),
    'courses.assignments': new Route('/courses/:courseId/assignments'),
    'courses.assignments.new': new Route('/courses/:courseId/assignments/new'),
    'courses.assignments.view': new Route('/courses/:courseId/assignments/:assignmentId'),
    'courses.assignments.edit': new Route('/courses/:courseId/assignments/:assignmentId/edit'),
    'courses.conferences': new Route('/courses/:courseId/conferences'),
    'courses.collaborations': new Route('/courses/:courseId/lti_collaborations'),
    'courses.users': new Route('/courses/:courseId/users'),
    'courses.users.view': new Route('/courses/:courseId/users/:userId'),
    'courses.settings': new Route('/courses/:courseId/settings'),
    'courses.settings.statistics': new Route('/courses/:courseId/statistics'),
    'courses.settings.confirm-conclude': new Route('/courses/:courseId/confirm_action?event=conclude'),
    'courses.settings.confirm-delete': new Route('/courses/:courseId/confirm_action?event=delete'),
    'courses.settings.copy': new Route('/courses/:courseId/copy'),
    'courses.settings.import': new Route('/courses/:courseId/content_migrations'),
    'courses.settings.export': new Route('/courses/:courseId/content_export'),
    'courses.settings.undelete': new Route('/courses/:courseId/undelete'),
    'courses.external-tool': new Route('/courses/:courseId/external_tools/:toolId'),

    'groups': new Route('/groups'),
    'groups.home': new Route('/groups/:groupId'),
    'groups.announcements': new Route('/groups/:groupId/announcements'),
    'groups.announcements.new': new Route('/groups/:groupId/announcements/discussion_topics/new?is_announcement=true'),
    'groups.pages': new Route('/groups/:groupId/pages'),
    'groups.pages.home': new Route('/groups/:groupId/wiki'),
    'groups.pages.view': new Route('/groups/:groupId/pages/:pageSlug'),
    'groups.pages.edit': new Route('/groups/:groupId/pages/:pageSlug/edit'),
    'groups.users': new Route('/groups/:groupId/users'),
    'groups.users.view': new Route('/groups/:groupId/users/:userId'),
    'groups.discussions': new Route('/groups/:groupId/discussion_topics'),
    'groups.discussions.new': new Route('/groups/:groupId/discussion_topics/new'),
    'groups.discussions.view': new Route('/groups/:groupId/discussion_topics/:topicId'),
    'groups.files': new Route('/groups/:groupId/files'),
    'groups.conferences': new Route('/groups/:groupId/conferences'),
    'groups.collaborations': new Route('/groups/:groupId/collaborations'),

    'profile': new Route('/profile'),
    'profile.about': new Route('/about[/:userId]'),
    'profile.notifications': new Route('/profile/communication'),
    'profile.settings': new Route('/profile/settings'),
    'profile.files': new Route('/files'),
    'profile.eportfolios': new Route('/dashboard/eportfolios'),
    'profile.eportfolios.home': new Route('/eportfolios/:portfolioId'),
    'profile.eportfolios.view': new Route('/eportfolios/:portfolioId/:sectionSlug[/:pageSlug]'),

    'calendar': new Route('/calendar'),

    'inbox': new Route('/conversations'),

    'admin': new Route('/accounts')
};
const deprecatedRoutes = {
    'course': 'courses',
    'profile.communication': 'profile.notifications'
};


function fireEvents(name, params) {
    var index = name.lastIndexOf('.');
    var baseName = name;

    emitter.emit(name, params, name);

    while (index >= 0) {
        baseName = baseName.substring(0, index);
        emitter.emit(baseName + '.*', params, name);
        index = baseName.lastIndexOf('.');
    }

    emitter.emit('*', params, name);
}

export function handlePath(path) {
    var match;
    var [name] = Object.entries(routes).find(([, route]) => (match = route.match(path))) || [];

    if (name === undefined) return;

    fireEvents(name, match);
}

function getUrl(name, params) {
    return routes[name].reverse(params);
}

function addListener(name, handler) {
    // 'name' is optional and defaults to '*'
    if (typeof name === 'function') {
        handler = name;
        name = '*';
    }

    let names = Array.isArray(name) ? name : name.split(/\s*,\s*/);

    names.forEach(name => {
        var baseName = name.endsWith('.*') ? name.slice(0, -2) : name;

        Object.entries(deprecatedRoutes).some(([deprecatedName, newName]) => {
            if (baseName === deprecatedName || baseName.startsWith(`${deprecatedName}.`)) {
                let suffix = name.substring(deprecatedName.length);

                baseName = (suffix === '') ? newName : `${newName}.${suffix}`;
                console.warn(`DEPRECATED: Route '${deprecatedName}' is deprecated and will be removed in v1.0.0, use '${newName}' instead`);

                return true;
            }
        });

        if (name !== '*' && !Object.keys(routes).some(routeName => {
            if (routeName === baseName || routeName.startsWith(`${baseName}.`)) {
                return true;
            }
        })) {
            throw new TypeError(`Route '${name}' does not exist.`);
        }

        emitter.on(name, handler);
    });
}


export default {
    getUrl,
    addListener
}
