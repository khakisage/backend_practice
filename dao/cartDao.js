const { Cart } = require('../models/index');

const cartDao = {
  // 카트 생성
  insertCart(params) {
    return new Promise((resolve, reject) => {
      Cart.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = cartDao;
