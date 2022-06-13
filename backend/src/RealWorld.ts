import { connect } from "mongoose";
import { RealWorldServer } from "./RealWorldServer";

export class RealWorld {

    private server: RealWorldServer;

    constructor(){
        this.server = new RealWorldServer(8080, "0.0.0.0");
    }

    async start(){
        await connect('mongodb://db');
        await this.server.start();
        // TODO: logging
        console.log(`Listening on ${"0.0.0.0"}:${8080}`);
    }
}
