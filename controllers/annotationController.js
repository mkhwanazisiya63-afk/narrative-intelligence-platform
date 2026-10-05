const Annotation = require("../models/annotationModel");


// ======================================================
// GET TAXONOMY
// ======================================================

exports.getTaxonomy = async (req, res) => {

    try {

        const taxonomy =
            await Annotation.getTaxonomy();

        res.json(taxonomy);

    }

    catch (error) {

        console.error(

            "Taxonomy error:",

            error

        );

        res.status(500).json({

            message: "Unable to load taxonomy."

        });

    }

};


// ======================================================
// GET MEDIA ANNOTATIONS
// ======================================================

exports.getMediaAnnotations = async (req, res) => {

    try {

        const annotations =

            await Annotation.getMediaAnnotations(

                req.params.mediaId

            );

        res.json(annotations);

    }

    catch (error) {

        console.error(

            "Annotation loading error:",

            error

        );

        res.status(500).json({

            message: "Unable to load annotations."

        });

    }

};


// ======================================================
// SAVE MEDIA ANNOTATIONS
// ======================================================

exports.saveMediaAnnotations = async (req, res) => {

    try {

        await Annotation.saveMediaAnnotations(

            req.params.mediaId,

            req.body

        );

        res.json({

            success: true,

            message: "Annotations saved successfully."

        });

    }

    catch (error) {

        console.error(

            "Annotation saving error:",

            error

        );

        res.status(500).json({

            message: "Unable to save annotations."

        });

    }

};


// ======================================================
// RELATED MEDIA
// ======================================================

exports.getRelatedMedia = async (req, res) => {

    try {

        const media =

            await Annotation.getRelatedMedia(

                req.params.mediaId

            );

        res.json(media);

    }

    catch (error) {

        console.error(

            "Related media error:",

            error

        );

        res.status(500).json({

            message: "Unable to calculate related media."

        });

    }

};