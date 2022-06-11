
import chai, { expect } from "chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import { RealWorldServer } from '../src/RealWorldServer'

describe('POST /register', () => {
    let serverObject: RealWorldServer;
    let server: any;

    beforeEach(async () => {
        serverObject = new RealWorldServer;
        await serverObject.start();
        server = serverObject['server'];
    });

    afterEach(async () => {
        await serverObject.stop();
    });

    it('rejects empty payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register'
        });
        expect(res.statusCode).to.equal(400);
    });

    it('rejects incomplete payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                password: "PAssWD1!"
            }
        });
        expect(res.statusCode).to.equal(400);
    });

    it('rejects payload with unknown key', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "PAssWD1!",
                unknown_key: true
            }
        });
        expect(res.statusCode).to.equal(400);
    });

    it('rejects malformed emails', async () => {
        let emails = [ "mochachai.com", "mocha@chaicom", "mocha@", "mocha@chai."]
        for (let email of emails) {
            const res = await server.inject({
                method: 'post',
                url: '/register',
                payload: {
                    email: email,
                    password: "PAssWD1!",
                }
            });
            expect(res.statusCode).to.equal(400);
        }
    });

    it('accpets correct payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "PAssWD1!",
            }
        });
        expect(res.statusCode).to.equal(201);
    });
});
