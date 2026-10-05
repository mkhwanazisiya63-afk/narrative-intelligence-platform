const connectDB = require("../database/database");


// ==========================================
// GET NOTES FOR MEDIA
// ==========================================

async function getNotesByMedia(mediaId) {

    const db = await connectDB();

    return await db.all(

        `
        SELECT
            id,
            media_id,
            title,
            note,
            created_at

        FROM research_notes

        WHERE media_id = ?

        ORDER BY created_at DESC
        `,

        [mediaId]

    );

}


// ==========================================
// CREATE NOTE
// ==========================================

async function createNote(note) {

    const db = await connectDB();

    const result = await db.run(

        `
        INSERT INTO research_notes
        (
            media_id,
            title,
            note
        )

        VALUES
        (
            ?,
            ?,
            ?
        )
        `,

        [
            note.media_id,
            note.title,
            note.note
        ]

    );

    return {

        id: result.lastID,

        media_id: note.media_id,

        title: note.title,

        note: note.note

    };

}


// ==========================================
// DELETE NOTE
// ==========================================

async function deleteNote(id) {

    const db = await connectDB();

    const result = await db.run(

        `
        DELETE FROM research_notes
        WHERE id = ?
        `,

        [id]

    );

    if (result.changes === 0) {

        throw new Error(
            "Research note could not be found."
        );

    }

}


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    getNotesByMedia,

    createNote,

    deleteNote

};