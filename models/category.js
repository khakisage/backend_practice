const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize,
      underscored: false,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Category.hasMany(db.Product, {
      foreignKey: { name: 'categoryId', as: 'Products' },
      sourceKey: 'id',
    });
  }
};
