const connectDB = require("../database/database");

// ======================================================
// GET TAXONOMY
// ======================================================

async function getTaxonomy() {

    const db = await connectDB();

    const themes = await db.all(`
        SELECT *
        FROM themes
        ORDER BY name COLLATE NOCASE ASC
    `);

    const emotions = await db.all(`
        SELECT *
        FROM emotions
        ORDER BY name COLLATE NOCASE ASC
    `);

    const mechanics = await db.all(`
        SELECT *
        FROM mechanics
        ORDER BY name COLLATE NOCASE ASC
    `);

    const structures = await db.all(`
        SELECT *
        FROM narrative_structures
        ORDER BY name COLLATE NOCASE ASC
    `);

    const archetypes = await db.all(`
        SELECT *
        FROM archetypes
        ORDER BY name COLLATE NOCASE ASC
    `);

    return {
        themes,
        emotions,
        mechanics,
        structures,
        archetypes
    };

}


// ======================================================
// GET MEDIA ANNOTATIONS
// ======================================================

async function getMediaAnnotations(mediaId) {

    const db = await connectDB();

    const themes = await db.all(`
        SELECT
            t.id,
            t.name,
            t.description
        FROM themes t

        INNER JOIN media_themes mt
            ON mt.themeId = t.id

        WHERE mt.mediaId = ?

        ORDER BY t.name COLLATE NOCASE ASC
    `, [mediaId]);


    const emotions = await db.all(`
        SELECT
            e.id,
            e.name,
            e.description
        FROM emotions e

        INNER JOIN media_emotions me
            ON me.emotionId = e.id

        WHERE me.mediaId = ?

        ORDER BY e.name COLLATE NOCASE ASC
    `, [mediaId]);


    const mechanics = await db.all(`
        SELECT
            m.id,
            m.name,
            m.description
        FROM mechanics m

        INNER JOIN media_mechanics mm
            ON mm.mechanicId = m.id

        WHERE mm.mediaId = ?

        ORDER BY m.name COLLATE NOCASE ASC
    `, [mediaId]);


    const structures = await db.all(`
        SELECT
            ns.id,
            ns.name,
            ns.description
        FROM narrative_structures ns

        INNER JOIN media_structures ms
            ON ms.structureId = ns.id

        WHERE ms.mediaId = ?

        ORDER BY ns.name COLLATE NOCASE ASC
    `, [mediaId]);


    const archetypes = await db.all(`
        SELECT
            a.id,
            a.name
        FROM archetypes a

        INNER JOIN media_archetypes ma
            ON ma.archetypeId = a.id

        WHERE ma.mediaId = ?

        ORDER BY a.name COLLATE NOCASE ASC
    `, [mediaId]);


    return {

        themes,

        emotions,

        mechanics,

        structures,

        archetypes

    };

}


// ======================================================
// REPLACE MEDIA ANNOTATIONS
// ======================================================

async function saveMediaAnnotations(

    mediaId,

    annotations

) {

    const db = await connectDB();

    await db.run("BEGIN TRANSACTION");

    try {

        // -------------------------------
        // THEMES
        // -------------------------------

        await db.run(
            `DELETE FROM media_themes WHERE mediaId = ?`,
            [mediaId]
        );

        for (const themeId of annotations.themes || []) {

            await db.run(
                `
                INSERT OR IGNORE INTO media_themes
                (mediaId, themeId)

                VALUES (?, ?)
                `,
                [mediaId, themeId]
            );

        }


        // -------------------------------
        // EMOTIONS
        // -------------------------------

        await db.run(
            `DELETE FROM media_emotions WHERE mediaId = ?`,
            [mediaId]
        );

        for (const emotionId of annotations.emotions || []) {

            await db.run(
                `
                INSERT OR IGNORE INTO media_emotions
                (mediaId, emotionId)

                VALUES (?, ?)
                `,
                [mediaId, emotionId]
            );

        }


        // -------------------------------
        // MECHANICS
        // -------------------------------

        await db.run(
            `DELETE FROM media_mechanics WHERE mediaId = ?`,
            [mediaId]
        );

        for (const mechanicId of annotations.mechanics || []) {

            await db.run(
                `
                INSERT OR IGNORE INTO media_mechanics
                (mediaId, mechanicId)

                VALUES (?, ?)
                `,
                [mediaId, mechanicId]
            );

        }


        // -------------------------------
        // STRUCTURES
        // -------------------------------

        await db.run(
            `DELETE FROM media_structures WHERE mediaId = ?`,
            [mediaId]
        );

        for (const structureId of annotations.structures || []) {

            await db.run(
                `
                INSERT OR IGNORE INTO media_structures
                (mediaId, structureId)

                VALUES (?, ?)
                `,
                [mediaId, structureId]
            );

        }


        // -------------------------------
        // ARCHETYPES
        // -------------------------------

        await db.run(
            `DELETE FROM media_archetypes WHERE mediaId = ?`,
            [mediaId]
        );

        for (const archetypeId of annotations.archetypes || []) {

            await db.run(
                `
                INSERT OR IGNORE INTO media_archetypes
                (mediaId, archetypeId)

                VALUES (?, ?)
                `,
                [mediaId, archetypeId]
            );

        }


        await db.run("COMMIT");

    }

    catch (error) {

        await db.run("ROLLBACK");

        throw error;

    }

}


// ======================================================
// RELATED MEDIA
// ======================================================

async function getRelatedMedia(mediaId) {

    const db = await connectDB();

    return await db.all(

        `
        SELECT
            m.id,
            m.title,
            m.mediaType,
            m.creator,
            m.year,
            m.description,

            (
                COALESCE((
                    SELECT COUNT(*)
                    FROM media_themes mt
                    WHERE mt.mediaId = m.id
                    AND mt.themeId IN (
                        SELECT themeId
                        FROM media_themes
                        WHERE mediaId = ?
                    )
                ), 0) * 5

                +

                COALESCE((
                    SELECT COUNT(*)
                    FROM media_emotions me
                    WHERE me.mediaId = m.id
                    AND me.emotionId IN (
                        SELECT emotionId
                        FROM media_emotions
                        WHERE mediaId = ?
                    )
                ), 0) * 3

                +

                COALESCE((
                    SELECT COUNT(*)
                    FROM media_mechanics mm
                    WHERE mm.mediaId = m.id
                    AND mm.mechanicId IN (
                        SELECT mechanicId
                        FROM media_mechanics
                        WHERE mediaId = ?
                    )
                ), 0) * 4

                +

                COALESCE((
                    SELECT COUNT(*)
                    FROM media_structures ms
                    WHERE ms.mediaId = m.id
                    AND ms.structureId IN (
                        SELECT structureId
                        FROM media_structures
                        WHERE mediaId = ?
                    )
                ), 0) * 5
            ) AS similarity

        FROM media m

        WHERE m.id != ?

        ORDER BY similarity DESC

        LIMIT 10
        `,

        [
            mediaId,
            mediaId,
            mediaId,
            mediaId,
            mediaId
        ]

    );

}

module.exports = {

    getTaxonomy,

    getMediaAnnotations,

    saveMediaAnnotations,

    getRelatedMedia

};