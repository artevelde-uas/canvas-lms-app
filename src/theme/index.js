import canvasTheme from '@instructure/canvas-theme';


// Override default Canvas theme to use 'Lato Extended'
export const theme = {
    ...canvasTheme,
    typography: {
        ...canvasTheme.typography,
        fontFamily: '"LatoWeb", "Lato Extended", "Lato", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
    }
}

export default theme;
