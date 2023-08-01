'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBelongGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBelongGroup.init({
    id: {type:DataTypes.INTEGER,primaryKey:true,allowNull:false},
    uId: DataTypes.INTEGER,
    gId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserBelongGroup',
  });
  UserBelongGroup.associate = function(models){
    UserBelongGroup.associate = function(models){
      UserBelongGroup.belongsTo(models.TaskManagers,{
        foreignKey:"uBI",
        allowNull:false
      })
    }
    UserBelongGroup.associate = function(models){
      UserBelongGroup.belongsTo(models.User,{
        foreignKey:"id",
        allowNull:false
      })
    }
    UserBelongGroup.belongsTo(models.UserGroups,{
      foreignKey:"gId",
      allowNull:false
    })
  }
  UserBelongGroup.associate = function(models){
    UserBelongGroup.belongsTo(models.User,{
      foreignKey:"uId",
      allowNull:false
    })
  }

  
  return UserBelongGroup;
};