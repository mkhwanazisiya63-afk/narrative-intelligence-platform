const Media = require("../models/mediaModel");

// ==========================================
// GET ALL MEDIA
// ==========================================

exports.getAllMedia = async (req, res) => {

    try {

        const media = await Media.getAllMedia();

        res.json(media);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load media."

        });

    }

};

// ==========================================
// GET ONE MEDIA
// ==========================================

exports.getMedia = async (req, res) => {

    try {

        const media = await Media.getMediaById(

            req.params.id

        );

        if (!media) {

            return res.status(404).json({

                message: "Media not found."

            });

        }

        res.json(media);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load media."

        });

    }

};

// ==========================================
// SEARCH
// ==========================================

exports.searchMedia = async (req, res) => {

    try {

        const query =

            req.query.q || "";

        const results =

            await Media.searchMedia(

                query

            );

        res.json(results);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Search failed."

        });

    }

};

// ==========================================
// CREATE
// ==========================================

exports.createMedia = async (req, res) => {

    try {

        await Media.insertMedia(

            req.body

        );

        res.json({

            success: true

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to create media."

        });

    }

};

// ==========================================
// UPDATE
// ==========================================

exports.updateMedia = async (req, res) => {

    try {

        await Media.updateMedia(

            req.params.id,

            req.body

        );

        res.json({

            success: true

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to update media."

        });

    }

};

// ==========================================
// DELETE
// ==========================================

exports.deleteMedia = async (req, res) => {

    try {

        await Media.deleteMedia(

            req.params.id

        );

        res.json({

            success: true

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to delete media."

        });

    }

};