const model = require("../models");

exports.getAllPost = (req, res, next) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var offset = (page - 1) * limit;

  model.Post.findAll({ limit, offset })
    .then(function (result) {
      if (result.length > 0) {
        var params = {
          status: "success",
          data: result,
          page: page,
          limit: limit,
        };

        return res.json(params);
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        return res.json(params);
      }
    })
    .catch((err) => {
      params = {
        status: "error",
        message: err.message,
      };

      return res.json(params);
    });
};

exports.createPost = (req, res, next) => {
  const { title, content, category, status } = req.body;
  model.Post.create({
    title: title,
    content: content,
    category: category,
    status: status,
  })
    .then(function (result) {
      var params = {
        status: "success",
        message: "Post Saved Successfully",
      };

      return res.json(params);
    })
    .catch((err) => {
      params = {
        status: "error",
        message: err.message,
      };

      return res.json(params);
    });
};

exports.getById = (req, res, next) => {
  var id = req.params.id;
  model.Post.findAll({
    where: {
      id: id,
    },
  })
    .then(function (result) {
      if (result[0]) {
        var params = {
          status: "success",
          data: result[0],
        };
        return res.json(params);
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        return res.json(params);
      }
    })
    .catch((err) => {
      params = {
        status: "error",
        message: err.message,
      };

      return res.json(params);
    });
};

exports.updatePost = (req, res, next) => {
  var id = req.params.id;
  const { title, content, category, status } = req.body;

  model.Post.update(
    {
      title: title,
      content: content,
      category: category,
      status: status,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(function (result) {
      if (result[0]) {
        var params = {
          status: "success",
          message: "Post Saved Successfully",
        };

        return res.json(params);
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        return res.json(params);
      }
    })
    .catch((err) => {
      params = {
        status: "error",
        message: err.message,
      };

      return res.json(params);
    });
};

exports.deletePost = (req, res, next) => {
  var id = req.params.id;

  model.Post.destroy({
    where: {
      id: id,
    },
  })
    .then(function (result) {
      if (result) {
        var params = {
          status: "success",
          message: "Post Deleted Successfully",
        };

        return res.json(params);
      } else {
        var params = {
          status: "error",
          message: "Post Not Found",
        };
        return res.json(params);
      }
    })
    .catch((err) => {
      params = {
        status: "error",
        message: err.message,
      };

      return res.json(params);
    });
};
