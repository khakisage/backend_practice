const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(100),
      },
      imageUrl: {
        type: Sequelize.STRING(500),
      },
      categoryId: {
        type: Sequelize.INTEGER,
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
    db.Product.belongsTo(db.Category, {
      foreignKey: { name: 'categoryId', as: 'Category' },
    });
  }

  static getIncludeAttributes() {
    return ['id', 'name', 'price', 'stock', 'description', 'imageUrl'];
  }
};
