const { sequelize } = require('./connection');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

//! model 생성
db.User = User;

//! model init(초기화)
User.init(sequelize);

module.exports = db;
