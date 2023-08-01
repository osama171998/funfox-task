'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskManagers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskManagers.init({
    task: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    uBI: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaskManagers',
  });
  TaskManagers.associate = function(models){
    TaskManagers.belongsTo(models.UserBelongGroup,{
        foreignKey:"uBI",
        allowNull:false
    })
  }
  return TaskManagers;
};