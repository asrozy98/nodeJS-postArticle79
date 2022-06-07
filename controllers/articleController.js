const model = require("../models");

exports.getAllPost = (req, res) => {
  req.addListener("data", (data) => {
    const body = JSON.parse(data.toString());
    try {
      var page = body.page ? body.page : 1;
      var limit = body.limit ? body.limit : 10;
      var offset = (parseInt(page) - 1) * limit;

      model.Post.findAll({ limit, offset }).then(function (result) {
        if (result.length > 0) {
          var params = {
            status: "success",
            data: result,
            page: page,
            limit: limit,
          };

          res.write(JSON.stringify(params));
          res.end();
        } else {
          var params = {
            status: "error",
            message: "Post Not Found",
          };
          res.write(JSON.stringify(params));
          res.end();
        }
      });
    } catch (err) {
      params = {
        status: "error",
        message: err,
      };

      res.write(JSON.stringify(params));
      res.end();
    }
  });
};

exports.createPost = (req, res) => {
  req.addListener("data", (data) => {
    const body = JSON.parse(data.toString());
    try {
      model.Post.create({
        title: body.title,
        content: body.content,
        category: body.category,
        status: body.status,
      }).then(function (result) {
        var params = {
          status: "success",
          message: "Post Saved Successfully",
        };

        res.write(JSON.stringify(params));
        res.end();
      });
    } catch (err) {
      params = {
        status: "error",
        message: err.message,
      };

      res.write(JSON.stringify(params));
      res.end();
    }
  });
};

exports.getById = (req, res) => {
  var id = req.url.split("/")[2];
  try {
    model.Post.findAll({
      where: {
        id: id,
      },
    }).then(function (result) {
      if (result.length > 0) {
        var params = {
          status: "success",
          data: result[0],
        };
        res.write(JSON.stringify(params));
        res.end();
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        res.write(JSON.stringify(params));
        res.end();
      }
    });
  } catch (err) {
    params = {
      status: "error",
      message: err,
    };

    res.write(JSON.stringify(params));
    res.end();
  }
};

exports.updatePost = (req, res) => {
  var id = req.url.split("/")[2];

  req.addListener("data", (data) => {
    const body = JSON.parse(data.toString());
    try {
      model.Post.update(
        {
          title: body.title,
          content: body.content,
          category: body.category,
          status: body.status,
        },
        {
          where: {
            id: id,
          },
        }
      ).then(function (result) {
        if (result[0]) {
          var params = {
            status: "success",
            message: "Post Saved Successfully",
          };

          res.write(JSON.stringify(params));
          res.end();
        } else {
          var params = {
            status: "error",
            message: "Post Not Found",
          };
          res.write(JSON.stringify(params));
          res.end();
        }
      });
    } catch (err) {
      params = {
        status: "error",
        message: err.message,
      };

      res.write(JSON.stringify(params));
      res.end();
    }
  });
};

exports.deletePost = (req, res) => {
  var id = req.url.split("/")[2];

  try {
    model.Post.destroy({
      where: {
        id: id,
      },
    }).then(function (result) {
      if (result) {
        var params = {
          status: "success",
          message: "Post Deleted Successfully",
        };

        res.write(JSON.stringify(params));
        res.end();
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        res.write(JSON.stringify(params));
        res.end();
      }
    });
  } catch (err) {
    params = {
      status: "error",
      message: err.message,
    };

    res.write(JSON.stringify(params));
    res.end();
  }
};
