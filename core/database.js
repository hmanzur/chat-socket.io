const pgp = require('pg-promise')({});

const cn = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const db = pgp(cn);

module.exports = db;
