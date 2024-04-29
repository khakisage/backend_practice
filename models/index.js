const { sequelize } = require('./connection');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');
const Address = require('./address');
const Cart = require('./cart');

const db = {};

db.sequelize = sequelize;

//! model 생성
db.User = User;
db.Product = Product;
db.Category = Category;
db.Review = Review;
db.Address = Address;
db.Cart = Cart;

//! model init(초기화)
User.init(sequelize);
Product.init(sequelize);
Category.init(sequelize);
Review.init(sequelize);
Address.init(sequelize);
Cart.init(sequelize);

//! model associate(관계 설정)
User.associate(db);
Product.associate(db);
Category.associate(db);
Review.associate(db);
Address.associate(db);
Cart.associate(db);

module.exports = db;
