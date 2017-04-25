"use strict";
const hapi = require("hapi");
const Inert = require("inert");
const path = require("path");
const port = 1234;
const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: port });
server.register([
    Inert,
], (err) => {
    server.start((err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Server running at:', server.info.uri);
        }
    });
});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});
//# sourceMappingURL=server.js.map