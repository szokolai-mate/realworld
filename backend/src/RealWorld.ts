import { RealWorldServer } from "./RealWorldServer";

export class RealWorld {

    private server: RealWorldServer

    constructor(){
        this.server = new RealWorldServer(8080, "0.0.0.0")
    }

    async start(){
        await this.server.start()
    }
}
