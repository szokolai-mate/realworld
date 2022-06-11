import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

export let server: Server;

export class RealWorldServer {
    private server: Server

    constructor(port?: number, host?: string) {
        this.server = Hapi.server({
            port: process.env.PORT || port,
            host: process.env.HOST || host
        })


        // TODO: routing management
        this.server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Live still working!';
            }
        });
    }

    async start() {
        // TODO: logging
        console.log(`Listening on ${this.server.settings.host}:${this.server.settings.port}`);
        return this.server.start()
    }
}
