const { connectDB } = require("../database");

// ============================================
// Allowed Tables
// ============================================

const TABLES = [
    "themes",
    "emotions",
    "mechanics",
    "narrative_structures"
];

// ============================================
// Validation
// ============================================

function validateTable(table) {

    if (!TABLES.includes(table)) {
        throw new Error("Invalid taxonomy table.");
    }

}

// ============================================
// Get All
// ============================================

async function getAll(table) {

    validateTable(table);

    const db = await connectDB();

    return db.all(`
        SELECT *
        FROM ${table}
        ORDER BY name
    `);

}

// ============================================
// Get By ID
// ============================================

async function getById(table, id) {

    validateTable(table);

    const db = await connectDB();

    return db.get(`
        SELECT *
        FROM ${table}
        WHERE id = ?
    `, [id]);

}

// ============================================
// Create
// ============================================

async function create(table, name, description = "") {

    validateTable(table);

    const db = await connectDB();

    await db.run(`
        INSERT INTO ${table}
        (name, description)
        VALUES (?, ?)
    `, [name, description]);

}

// ============================================
// Update
// ============================================

async function update(table, id, name, description = "") {

    validateTable(table);

    const db = await connectDB();

    await db.run(`
        UPDATE ${table}
        SET
            name = ?,
            description = ?
        WHERE id = ?
    `, [name, description, id]);

}

// ============================================
// Delete
// ============================================

async function remove(table, id) {

    validateTable(table);

    const db = await connectDB();

    await db.run(`
        DELETE
        FROM ${table}
        WHERE id = ?
    `, [id]);

}

// ============================================
// Search
// ============================================

async function search(table, query) {

    validateTable(table);

    const db = await connectDB();

    return db.all(`
        SELECT *
        FROM ${table}
        WHERE name LIKE ?
        ORDER BY name
    `, [`%${query}%`]);

}

module.exports = {

    getAll,

    getById,

    create,

    update,

    remove,

    search

};