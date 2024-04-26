const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');

const userService = {
  // 사용자 생성
  async reg(params) {
    let inserted = null;
    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(`services/userService.js - hash - ${JSON.stringify(params.password)}`);
    } catch (err) {
      logger.error(`services/userService.js - hash - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    const newParams = {
      ...params,
      password: hashPassword,
    };
    try {
      inserted = await userDao.insert(newParams);
      logger.debug(`services/userService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/userService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
};

module.exports = userService;
