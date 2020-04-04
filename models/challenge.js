module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Challenge.associate = function(models) {
    // We're saying that a Challenge should belong to a User
    // A Challenge can't be created without a User due to the foreign key constraint
    Challenge.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Challenge;
};
