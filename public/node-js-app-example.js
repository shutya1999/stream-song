const HTTP = require('http');
const Server = HTTP.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'NodeApp': process.versions.node,
    });
    response.write('<div style="text-align:center;margin-top: 22vh; width:100%">');
    response.write('<p>Congratulations!</p>');
    response.write('<p>Your Node JS application has been created</p>');
    response.write('</div>');

    response.end();
});
Server.listen(process.env.PORT);