const connectDB = require("../database/database");


// ==========================================
// GET ANALYTICS OVERVIEW
// ==========================================

exports.getOverview = async (req, res) => {

    try {

        const db = await connectDB();


        // ======================================
        // TOTAL MEDIA
        // ======================================

        const mediaCount = await db.get(`
            SELECT COUNT(*) AS count
            FROM media
        `);


        // ======================================
        // MEDIA BY TYPE
        // ======================================

        const mediaByType = await db.all(`
            SELECT
                mediaType AS type,
                COUNT(*) AS count

            FROM media

            GROUP BY mediaType

            ORDER BY count DESC
        `);


        // ======================================
        // THEMES
        // ======================================

        const themes = await db.all(`
            SELECT
                t.id,
                t.name,
                COUNT(mt.mediaId) AS count

            FROM themes t

            LEFT JOIN media_themes mt
                ON mt.themeId = t.id

            GROUP BY
                t.id,
                t.name

            ORDER BY
                count DESC,
                t.name ASC
        `);


        // ======================================
        // EMOTIONS
        // ======================================

        const emotions = await db.all(`
            SELECT
                e.id,
                e.name,
                COUNT(me.mediaId) AS count

            FROM emotions e

            LEFT JOIN media_emotions me
                ON me.emotionId = e.id

            GROUP BY
                e.id,
                e.name

            ORDER BY
                count DESC,
                e.name ASC
        `);


        // ======================================
        // MECHANICS
        // ======================================

        const mechanics = await db.all(`
            SELECT
                m.id,
                m.name,
                COUNT(mm.mediaId) AS count

            FROM mechanics m

            LEFT JOIN media_mechanics mm
                ON mm.mechanicId = m.id

            GROUP BY
                m.id,
                m.name

            ORDER BY
                count DESC,
                m.name ASC
        `);


        // ======================================
        // NARRATIVE STRUCTURES
        // ======================================

        const structures = await db.all(`
            SELECT
                ns.id,
                ns.name,
                COUNT(ms.mediaId) AS count

            FROM narrative_structures ns

            LEFT JOIN media_structures ms
                ON ms.structureId = ns.id

            GROUP BY
                ns.id,
                ns.name

            ORDER BY
                count DESC,
                ns.name ASC
        `);


        // ======================================
        // CHARACTER ARCHETYPES
        // ======================================

        const archetypes = await db.all(`
            SELECT
                a.id,
                a.name,
                COUNT(ma.mediaId) AS count

            FROM archetypes a

            LEFT JOIN media_archetypes ma
                ON ma.archetypeId = a.id

            GROUP BY
                a.id,
                a.name

            ORDER BY
                count DESC,
                a.name ASC
        `);


        // ======================================
        // RESEARCH NOTES
        // ======================================

        const researchNotes = await db.get(`
            SELECT COUNT(*) AS count

            FROM research_notes
        `);


        // ======================================
        // ANNOTATED MEDIA
        // ======================================

        const annotatedMedia = await db.get(`
            SELECT
                COUNT(DISTINCT mediaId) AS count

            FROM (

                SELECT mediaId
                FROM media_themes

                UNION

                SELECT mediaId
                FROM media_emotions

                UNION

                SELECT mediaId
                FROM media_mechanics

                UNION

                SELECT mediaId
                FROM media_structures

                UNION

                SELECT mediaId
                FROM media_archetypes

            )
        `);


        // ======================================
        // SEND RESULTS
        // ======================================

        res.json({

            mediaCount:
                mediaCount.count,

            annotatedMedia:
                annotatedMedia.count,

            researchNotes:
                researchNotes.count,

            mediaByType,

            themes,

            emotions,

            mechanics,

            structures,

            archetypes

        });

    }

    catch (error) {

        console.error(

            "ANALYTICS DATABASE ERROR:",

            error

        );

        res.status(500).json({

            message:
                "Unable to load analytics.",

            error:
                error.message

        });

    }

};