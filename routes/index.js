const articleController = require("../controllers/articleController");

exports.index = (req, res) => {
  var str = req.url;
  var path = str.split("/");
  if (path[1] === "article") {
    if (path[2]) {
      if (req.method === "GET") {
        articleController.getById(req, res);
      }
      if (req.method === "PATCH") {
        articleController.updatePost(req, res);
      }
      if (req.method === "DELETE") {
        articleController.deletePost(req, res);
      }
    } else {
      if (req.method === "GET") {
        articleController.getAllPost(req, res);
      }
      if (req.method === "POST") {
        articleController.createPost(req, res);
      }
    }
  } else {
    res.write("Hello World");
    res.end();
  }
};
