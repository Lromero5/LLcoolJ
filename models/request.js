module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
      requester: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
  
    Request.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Request.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Request;
  };