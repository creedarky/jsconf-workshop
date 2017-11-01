module.exports = (sequelize, DataType) => {
  const Votes = sequelize.define('Votes', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    value: {
      type: DataType.INTEGER,
      defaultValue: 1,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Votes.belongsTo(models.Users, { as: 'user' });
        Votes.belongsTo(models.Images, { as: 'image' });
      },
    },
  });
  return Votes;
};
