const { sequelize } = require('./connection');
const User = require('./user');
const Product = require('./product');

const db = {};

db.sequelize = sequelize;

//! model 생성
db.User = User;
db.Product = Product;

//! model init(초기화)
User.init(sequelize);
Product.init(sequelize);

module.exports = db;
