const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(15),
        allowNull: false,
        foreignKey: true,
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(11),
      },
      role: {
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
    db.User.hasMany(db.Review, {
      foreignKey: { name: 'userId', allowNull: false },
    });
    db.User.hasMany(db.Address, {
      foreignKey: { name: 'id', allowNull: false },
    });
    db.User.hasOne(db.Cart, {
      foreignKey: { name: 'userId', allowNull: false },
    });
  }
};
