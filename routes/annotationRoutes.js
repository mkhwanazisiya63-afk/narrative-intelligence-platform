const express = require("express");

const router = express.Router();

const annotationController =
    require("../controllers/annotationController");


// ======================================================
// TAXONOMY
// ======================================================

router.get(
    "/taxonomy",
    annotationController.getTaxonomy
);


// ======================================================
// MEDIA ANNOTATIONS
// ======================================================

router.get(
    "/media/:mediaId",
    annotationController.getMediaAnnotations
);


// ======================================================
// SAVE ANNOTATIONS
// ======================================================

router.put(
    "/media/:mediaId",
    annotationController.saveMediaAnnotations
);


// ======================================================
// RELATED MEDIA
// ======================================================

router.get(
    "/media/:mediaId/related",
    annotationController.getRelatedMedia
);


module.exports = router;