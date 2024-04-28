const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(500),
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Review.belongsTo(db.User, {
      foreignKey: { name: 'userId', allowNull: false },
    });
    db.Review.belongsTo(db.Product, {
      foreignKey: { name: 'productId', allowNull: false },
    });
  }
};
