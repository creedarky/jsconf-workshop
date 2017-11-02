module.exports = (sequelize, DataType) => {
  const Images = sequelize.define('Images', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    url: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Images.hasMany(models.Votes, { as: 'votes' });
      },
    },
  });
  return Images;
};
