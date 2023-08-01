'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserBelongGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"id"
        },
        allowNull:false,
        onDelete:"cascade"
      },
      gId: {
        type: Sequelize.INTEGER,
        references:{
          model:"UserGroups",
          key:"id"
        },
        allowNull:false,
        onDelete:"cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserBelongGroups');
  }
};