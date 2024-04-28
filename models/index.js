const { sequelize } = require('./connection');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');

const db = {};

db.sequelize = sequelize;

//! model 생성
db.User = User;
db.Product = Product;
db.Category = Category;
db.Review = Review;

//! model init(초기화)
User.init(sequelize);
Product.init(sequelize);
Category.init(sequelize);
Review.init(sequelize);

//! model associate(관계 설정)
User.associate(db);
Product.associate(db);
Category.associate(db);
Review.associate(db);

module.exports = db;
