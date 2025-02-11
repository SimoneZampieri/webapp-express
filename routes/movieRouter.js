const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const upload = require("../middlewares/multer");

router.get("/", movieController.index);

router.get("/:id", movieController.show);

router.post("/:id/reviews", movieController.storeReview);

router.get("/:id", movieController.update);

router.get("/:id", movieController.destroy);

router.post("/", upload.single("image"), movieController.store);

module.exports = router;
