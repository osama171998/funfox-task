'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserGroups.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGroups',
  });

  UserGroups.associate = function(models){
    UserGroups.belongsTo(models.UserBelongGroup,{
      foreignKey:"id",
      allowNull:false
    })
  }

  return UserGroups;
};