import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

export class MockDatabase {
    private mongod: MongoMemoryServer;

    constructor(){
        this.mongod = new MongoMemoryServer();
    }

    async start() {
        await this.mongod.start();
        return mongoose.connect(this.mongod.getUri());
    }

    async stop() {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        return this.mongod.stop();
    }

    async clear(){
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}
