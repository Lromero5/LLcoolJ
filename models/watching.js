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
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Watching.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Watching;
  };