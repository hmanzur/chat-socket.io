const db = require('./../database');

class Model {
    static TABLE;
    static class;
    static PK;

    constructor() {
        if (!this.constructor.TABLE) {
            this.constructor.TABLE = this.constructor.name.toLowerCase();
            this.constructor.class = this.constructor.name;
        }
    }

    static fromObject(data, className) {
        let instance = new className();

        return this.setProps(instance, data);
    }

    static setProps(instance, data) {
        const items = Object.keys(instance);

        for (let prop in items) {
            instance[items[prop]] = data[items[prop]];
        }

        return instance;
    }

    static get connection() {
        return this.CONNECTION;
    }

    static async get (id, pk) {
        return db.one('SELECT * FROM ${table:name} where ${column:name}=${id}', {
            column: pk || this.PK,
            id: id,
            table: this.TABLE
        }, data => this.fromObject(data, this.class));
    }

    static async all (id, column) {
        return db.any('SELECT * FROM ${table:name}', {
            table: this.TABLE
        }, data => this.fromObject(data, this.class));
    }

    static async query (query, params, callback) {
        return db.any(query, params, callback);
    }

    get pk() {
        return this[this.constructor.PK];
    }

    async delete () {
        return db.none('DELETE FROM ${table:name} where id=${id}', {
            id: this.pk,
            table: this.constructor.TABLE
        });
    }
}

Model.CONNECTION = db;
Model.PK = 'id';

module.exports.Model = Model;
