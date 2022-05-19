'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Capsule)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid format email'
        },
        notNull: {
          msg: 'email cannot be null'
        }
      },
      unique: {
        msg: "Email is already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty'
        },
        notNull: {
          msg: 'password cannot be null'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (instances, options) => {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instances.password, salt);
        instances.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};