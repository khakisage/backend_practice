const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
    }, {
      sequelize,
      underscored: false,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Cart.belongsTo(db.User, {
      foreignKey: { name: 'userId', allowNull: false },
    });
    db.Cart.hasMany(db.Product, {
      foreignKey: { name: 'productId', allowNull: false },
    });
  }
};
