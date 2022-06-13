import { Database } from "./Database";
import { RealWorldServer } from "./RealWorldServer";

export class RealWorld {

    private server: RealWorldServer
    private database: Database

    constructor(){
        this.server = new RealWorldServer(8080, "0.0.0.0");
        this.database = new Database();
    }

    async start(){
        await this.database.connect();
        await this.server.start();
    }
}
