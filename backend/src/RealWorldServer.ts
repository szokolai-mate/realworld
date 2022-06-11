import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { RegisterRoute } from "./routes/register";

export let server: Server;

export class RealWorldServer {
    private server: Server

    constructor(port?: number, host?: string) {
        this.server = Hapi.server({
            port: process.env.PORT || port,
            host: process.env.HOST || host
        });

        this.server.route(RegisterRoute);
    }

    async start() {
        // TODO: logging
        console.log(`Listening on ${this.server.settings.host}:${this.server.settings.port}`);
        return this.server.start();
    }
}
