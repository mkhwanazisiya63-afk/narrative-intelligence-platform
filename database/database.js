const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function connectDB() {

    if (db) {
        return db;
    }

    db = await open({
        filename: "./database/narrative.db",
        driver: sqlite3.Database
    });

    await db.exec("PRAGMA foreign_keys = ON");

    return db;
}

module.exports = connectDB;