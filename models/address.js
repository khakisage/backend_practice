const Sequelize = require('sequelize');

module.exports = class Address extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: '기본 배송지',
      },
      postCode: {
        type: Sequelize.INTEGER(7),
        allowNull: false,
      },
      address1: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      address2: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      address3: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      userId: {
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
    db.Address.belongsTo(db.User, {
      foreignKey: { name: 'id', allowNull: false },
    });
  }
};
