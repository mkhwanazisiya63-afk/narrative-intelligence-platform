const express =
    require("express");

const router =
    express.Router();

const controller =
    require("../controllers/taxonomyController");


router.post(

    "/:type",

    controller.create

);


router.delete(

    "/:type/:id",

    controller.remove

);


module.exports = router;