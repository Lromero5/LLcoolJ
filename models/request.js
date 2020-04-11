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
      Request.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Request;
  };