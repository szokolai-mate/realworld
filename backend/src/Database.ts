import { connect } from 'mongoose';

export class Database {
    constructor() {}

    async connect() {
        return connect('mongodb://db');
    }
}
