const { User } = require('../models/index');

const userDao = {
  // 회원가입
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted));
        resolve(newInserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = userDao;
