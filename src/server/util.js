
function log(...args) {
    args.forEach(text => {
        const lines = text.replace(/(^\s*\n|\n\s*$)/g, '').split(/\n/);
        const indentSize = lines.reduce((minimumIndentSize, currentLine) => {
            const lineIndentSize = currentLine.search(/[^ ]|$/);
            
            return Math.min(minimumIndentSize, lineIndentSize);
        }, Number.POSITIVE_INFINITY);
        
        console.log(lines.map(line => line.slice(indentSize)).join('\n'));
    });
}

exports.log = log;
