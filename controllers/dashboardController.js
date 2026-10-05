const connectDB = require("../database/database");

// ======================================================
// DASHBOARD
// ======================================================

exports.getDashboard = async (req, res) => {

    try {

        const db = await connectDB();

        const totalMedia = await db.get(
            `SELECT COUNT(*) AS total
             FROM media`
        );

        const totalThemes = await db.get(
            `SELECT COUNT(*) AS total
             FROM themes`
        );

        const totalEmotions = await db.get(
            `SELECT COUNT(*) AS total
             FROM emotions`
        );

        const totalNotes = await db.get(
            `SELECT COUNT(*) AS total
             FROM research_notes`
        );

        const mediaTypes = await db.all(
            `SELECT
                mediaType,
                COUNT(*) AS total
             FROM media
             GROUP BY mediaType
             ORDER BY total DESC`
        );

        const topThemes = await db.all(
            `SELECT
                themes.name,
                COUNT(*) AS total
             FROM media_themes
             JOIN themes
             ON themes.id = media_themes.themeId
             GROUP BY themes.id
             ORDER BY total DESC
             LIMIT 10`
        );

        const recentNotes = await db.all(
            `SELECT
                title,
                note
             FROM research_notes
             ORDER BY created_at DESC
             LIMIT 5`
        );

        const annotated = await db.get(
            `SELECT
                COUNT(DISTINCT mediaId) AS total
             FROM media_themes`
        );

        const progress =
            totalMedia.total === 0
            ? 0
            : Math.round(
                (annotated.total / totalMedia.total)
                * 100
            );

        res.json({

            totalMedia: totalMedia.total,

            totalThemes: totalThemes.total,

            totalEmotions: totalEmotions.total,

            totalNotes: totalNotes.total,

            mediaTypes,

            topThemes,

            recentNotes,

            progress

        });

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to load dashboard."

        });

    }

};