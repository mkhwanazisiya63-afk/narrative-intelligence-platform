const connectDB = require("../database/database");

// ===============================
// Get All Media
// ===============================

async function getAllMedia() {

    const db = await connectDB();

    return await db.all(

        `
        SELECT *
        FROM media
        ORDER BY createdAt DESC
        `

    );

}

// ===============================
// Get Media By ID
// ===============================

async function getMediaById(id) {

    const db = await connectDB();

    return await db.get(

        `
        SELECT *
        FROM media
        WHERE id = ?
        `,

        [id]

    );

}

// ===============================
// Add Media
// ===============================

async function insertMedia(media) {

    const db = await connectDB();

    await db.run(

        `
        INSERT INTO media
        (
            id,
            title,
            mediaType,
            creator,
            year,
            description
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
        `,

        [

            media.id,
            media.title,
            media.mediaType,
            media.creator,
            media.year,
            media.description

        ]

    );

}

// ===============================
// Update Media
// ===============================

async function updateMedia(id, media) {

    const db = await connectDB();

    await db.run(

        `
        UPDATE media

        SET

            title = ?,

            mediaType = ?,

            creator = ?,

            year = ?,

            description = ?

        WHERE id = ?
        `,

        [

            media.title,
            media.mediaType,
            media.creator,
            media.year,
            media.description,
            id

        ]

    );

}

// ===============================
// Search
// ===============================

async function searchMedia(

    query = "",

    type = "",

    sort = "relevance"

) {

    const db = await connectDB();

    let sql =

    `
    SELECT *

    FROM media

    WHERE

    (

        LOWER(title) LIKE LOWER(?)

        OR LOWER(creator) LIKE LOWER(?)

        OR LOWER(description) LIKE LOWER(?)

    )
    `;

    const params = [

        `%${query}%`,
        `%${query}%`,
        `%${query}%`

    ];

    if (type !== "") {

        sql +=

        " AND mediaType = ? ";

        params.push(type);

    }

    switch (sort) {

        case "title":

            sql +=

            " ORDER BY title COLLATE NOCASE ASC ";

            break;

        case "year":

            sql +=

            " ORDER BY year DESC ";

            break;

        default:

            sql +=

            " ORDER BY createdAt DESC ";

    }

    return await db.all(

        sql,

        params

    );

}

// ===============================
// Delete
// ===============================

async function deleteMedia(id) {

    const db = await connectDB();

    await db.run(
        `
        DELETE FROM media_themes
        WHERE mediaId = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM media_emotions
        WHERE mediaId = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM media_mechanics
        WHERE mediaId = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM media_structures
        WHERE mediaId = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM media_archetypes
        WHERE mediaId = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM research_notes
        WHERE media_id = ?
        `,
        [id]
    );

    await db.run(
        `
        DELETE FROM media
        WHERE id = ?
        `,
        [id]
    );

}

module.exports = {

    getAllMedia,

    getMediaById,

    insertMedia,

    updateMedia,

    searchMedia,

    deleteMedia

};