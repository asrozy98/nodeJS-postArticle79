var express = require("express");
var router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.get("/article", articleController.getAllPost);
router.post("/article", articleController.createPost);
router.get("/article/:id", articleController.getById);
router.patch("/article/:id", articleController.updatePost);
router.delete("/article/:id", articleController.deletePost);

module.exports = router;
