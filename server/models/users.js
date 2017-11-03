/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Votes, { as: 'votes' });
      },
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
      generatePassword: (password) => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
      },
    },
  });
  return Users;
};
