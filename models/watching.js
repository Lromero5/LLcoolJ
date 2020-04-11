module.exports = function(sequelize, DataTypes) {
    var Watching = sequelize.define("Watching", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
          len: [1]
        }
      }
    });
  
    Watching.associate = function(models) {
     
      Watching.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Watching;
  };