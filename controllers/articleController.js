const model = require("../models");

exports.getAllPost = (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = (page - 1) * limit;
  let totalData;

  model.Post.findAll()
    .then(function (result) {
      totalData = result.length;
      model.Post.findAll({ limit, offset }).then(function (result) {
        if (result.length > 0) {
          return res.json({
            status: "success",
            data: result,
            total_data: totalData,
            per_page: limit,
            page,
          });
        } else {
          return res.json({
            status: "error",
            message: "Post Not Found",
          });
        }
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
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
    .then(function () {
      return res.json({
        status: "success",
        message: "Post Saved Successfully",
      });
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.getById = (req, res, next) => {
  const id = req.params.id;
  model.Post.findAll({
    where: {
      id: id,
    },
  })
    .then(function (result) {
      if (result[0]) {
        return res.json({
          status: "success",
          data: result[0],
        });
      } else {
        return res.json({
          status: "error",
          message: "Post Not Found",
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
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
        return res.json({
          status: "success",
          message: "Post Saved Successfully",
        });
      } else {
        return res.json({
          status: "error",
          message: "Post Not Found",
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};

exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  model.Post.destroy({
    where: {
      id: id,
    },
  })
    .then(function (result) {
      if (result) {
        return res.json({
          status: "success",
          message: "Post Deleted Successfully",
        });
      } else {
        return res.json({
          status: "error",
          message: "Post Not Found",
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "error",
        message: err.message,
      });
    });
};
