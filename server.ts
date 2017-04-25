import * as hapi from "hapi";
import * as Inert from "inert";
import * as path from "path";

const port:number = 1234;
const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port : port });

server.register([
    Inert,
    ], (err) => {
    server.start( (err) => {
        if (err) {
            console.error(err);
        } else {
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



