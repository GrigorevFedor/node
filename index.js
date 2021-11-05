const http = require('http');
const path = require('path');
const fs = require('fs');


function getDocument(content) {
    if (typeof (content) == 'object') {
        let textContent = '';
        content.forEach(element => {
            textContent += `<div><a href="${element}">${element}</a></div>`
        });
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Hello Node JS</title>
            </head>

            <body>
                <h1>Hello from Node JS</h1>
                <div class="content">${textContent}
                </div>
            </body>

            </html >`;
    }
    else {
        return escape(content);
    }
}

function getFile(fileName = '/') {
    const executionDir = process.cwd();
    const fullPath = path.join(executionDir, fileName);

    if (fs.lstatSync(fullPath).isFile()) {
        const data = fs.readFileSync(fullPath, { encoding: 'utf8' });
        return data;
        console.log(data);
    } else {

        return fs.readdirSync(fullPath);
    }
}

const server = http.createServer((req, res) => {

    // METHOD
    if (req.method === 'GET') {
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        })
        res.write(getDocument(getFile(req.url)));
        res.end();

    } else {
        res.writeHead(405, 'Not Allowed', {
            'test-header': 'header',
        });
        res.write('Method not allowed');
        res.end();
    }
});

server.listen(5555);