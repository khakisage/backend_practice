const { sequelize } = require('./connection');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');

const db = {};

db.sequelize = sequelize;

//! model 생성
db.User = User;
db.Product = Product;
db.Category = Category;

//! model init(초기화)
User.init(sequelize);
Product.init(sequelize);
Category.init(sequelize);

module.exports = db;
