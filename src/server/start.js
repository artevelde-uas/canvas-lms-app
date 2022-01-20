const http = require('http');
const fs = require('fs');
const path = require('path');
const heredoc = require('heredoc-tag').default.unindent.trim;

const appRoot = process.cwd();
const distFolder = path.join(appRoot, '/dist');
const package = require(path.join(appRoot, '/package.json'));
const port = package.config?.server?.port || 5000;
const serveFile = package.config?.server?.file || 'desktop.dev.js';


console.log('\n');

// Create 'dist' folder if it doesn't exist
if (!fs.existsSync(distFolder)) {
    console.log(heredoc`
        Folder '${distFolder}' does not exist.
         -> Creating '${distFolder}' ...
    ` + '\n');

    fs.mkdirSync(distFolder);

    // Check for compiled script
    if (!fs.existsSync(serveFile)) {
        console.log(heredoc`
            WARNING: File '${serveFile}' does not exist.
                     Please compile your source files before serving.
        `, '\n');
    }
}

// Concatenate the CSS warning files and output to 'dist' folder
themeWarnings: {
    const hideThemeWarningsStylesFile = path.join(__dirname, '/hide-theme-editor-warning.css');
    const hideEnvWarningsStylesFile = path.join(__dirname, '/hide-test-env-warning.css');
    const hideWarningsStylesPath = path.join(distFolder, '/hide-warnings.css');

    const hideWarningsStyles = (
        fs.readFileSync(hideThemeWarningsStylesFile, 'utf8') + '\n' +
        fs.readFileSync(hideEnvWarningsStylesFile, 'utf8')
    );

    if (!fs.existsSync(hideWarningsStylesPath)) {
        console.log(heredoc`
            File '${hideWarningsStylesPath}' does not exist.
             -> Creating '${hideWarningsStylesPath}' ...
                Please upload this CSS file to your Canvas theme.
        `, '\n');
    } else {
        const currentHideWarningsStyles = fs.readFileSync(hideWarningsStylesPath, 'utf8');

        if (currentHideWarningsStyles === hideWarningsStyles) {
            break themeWarnings;
        }

        console.log(heredoc`
            File '${hideWarningsStylesPath}' was modified.
              Please upload this CSS file to your Canvas theme again.
        `, '\n');
    }

    fs.writeFileSync(hideWarningsStylesPath, hideWarningsStyles);
}

// Replace URL inside the server file and output to 'dist' folder
serveLocal: {
    const serveLocalScriptFile = path.join(distFolder, '/serve-local.js');
    const serveLocalScriptDistFile = path.join(__dirname, '/serve-local.js.dist');

    const serveLocalScriptDist = fs.readFileSync(serveLocalScriptDistFile, 'utf8');
    const serveLocalScript = serveLocalScriptDist.replace(/{{URL}}/, `http://127.0.0.1:${port}`)

    if (!fs.existsSync(serveLocalScriptFile)) {
        console.log(heredoc`
            File '${serveLocalScriptFile}' does not exist.
             -> Creating '${serveLocalScriptFile}' ...
                Please upload this JavaScript file to your Canvas theme.
        `, '\n');
    } else {
        const currentServeLocalScript = fs.readFileSync(serveLocalScriptFile, 'utf8');

        if (currentServeLocalScript === serveLocalScript) {
            break serveLocal;
        }

        console.log(heredoc`
            File '${serveLocalScriptFile}' was modified.
              Please upload this JavaScript file to your Canvas theme again.
        `, '\n');
    }

    fs.writeFileSync(serveLocalScriptFile, serveLocalScript);
}

// Create an instance of the http server to handle HTTP requests
const server = http.createServer((request, response) => {
    const filePath = path.join(distFolder, '/', serveFile);
    const stat = fs.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'application/javascript',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(response);
});

// Start the server on port 3000
server.listen(port, '127.0.0.1');

console.log(`Serving '/dist/${serveFile}' on 'http://127.0.0.1:${port}'`, '\n');
