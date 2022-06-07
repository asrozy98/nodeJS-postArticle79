"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          len: {
            args: 20,
            msg: "Title must be minimal 20 characters",
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Content is required",
          },
          len: {
            args: 200,
            msg: "Content must be minimal 200 characters",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category is required",
          },
          len: {
            args: 3,
            msg: "Category must be minimal 3 characters",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("Publish", "Draft", "Thrash"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["Publish", "Draft", "Thrash"]],
            msg: "Status must be Publish, Draft or Thrash",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
