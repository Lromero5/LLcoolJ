module.exports = function(sequelize, DataTypes) {
  var Challenges = sequelize.define("Challenges", {
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
    },
    friendId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      len:[1]
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      len:[1]
    }
    });

  Challenges.associate = function(models) {
    // We're saying that a Challenge should belong to a User
    // A Challenge can't be created without a User due to the foreign key constraint
    Challenges.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Challenges;
};
