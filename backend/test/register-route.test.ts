
import { RealWorldServer } from '../src/RealWorldServer'
import { MockDatabase } from './mock-db';

const db = new MockDatabase();

describe('POST /register', () => {
    let serverObject: RealWorldServer;
    let server: any;

    beforeAll(async () => {
        await db.start();
        serverObject = new RealWorldServer;
        await serverObject.start();
        server = serverObject['server'];
    });

    afterAll(async () => {
        await db.stop();
        await serverObject.stop();

    })

    it('rejects empty payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register'
        });
        expect(res.statusCode).toEqual(400);
    });

    it('rejects incomplete payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
            }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('rejects payload with unknown key', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11",
                unknown_key: true
            }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('rejects empty email', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "",
                password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11"
            }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('rejects non-hash password', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "PAssWD1!"
            }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('rejects malformed emails', async () => {
        let emails = [ "mochachai.com", "mocha@chaicom", "mocha@", "mocha@chai."]
        for (let email of emails) {
            const res = await server.inject({
                method: 'post',
                url: '/register',
                payload: {
                    email: email,
                    password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11",
                }
            });
            expect(res.statusCode).toEqual(400);
        }
    });

    it('accpets correct payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11",
            }
        });
        expect(res.statusCode).toEqual(201);
    });

    it('rejects duplicate payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/register',
            payload: {
                email: "mocha@chai.com",
                password: "a441b15fe9a3cf56661190a0b93b9dec7d04127288cc87250967cf3b52894d11",
            }
        });
        expect(res.statusCode).toEqual(400);
    });
});
