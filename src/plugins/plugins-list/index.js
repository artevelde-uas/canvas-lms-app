import { router, dom } from '@artevelde-uas/canvas-lms-app';
import ReactDOM from 'react-dom';

import PluginTable from './components/PluginTable';


export default function ({ plugins }) {
    if (plugins.size === 0) return;

    router.onRoute('profile.settings', async params => {
        // Wait for the feature flag element
        const featureFlagWrapper = await dom.onElementReady('.feature-flag-wrapper');

        // Create the container element
        const container = document.createElement('div');

        // Append the container after the feature flag element
        featureFlagWrapper.after(container);

        // Prepend the title before the container
        container.insertAdjacentHTML('beforebegin', `
            <h2 aria-hidden="true">Installed plug-ins</h2>
        `);

        // Render the component
        ReactDOM.render(<PluginTable plugins={plugins} />, container);
    });
}
