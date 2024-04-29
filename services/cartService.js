const logger = require('../lib/logger');
const cartDao = require('../dao/cartDao');

const cartService = {
  // 카트 생성
  async reg(params) {
    let inserted = null;
    try {
      inserted = await cartDao.insertCart(params);
      logger.debug(`services/cartService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/cartService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
};

module.exports = cartService;
