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
    challenger: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    
    friendId:{
      type: DataTypes.STRING,
      allowNull: false,
      len:[1]
    }
    });

  Challenges.associate = function(models) {
   
    Challenges.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Challenges;
};
