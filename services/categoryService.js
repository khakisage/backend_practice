const logger = require('../lib/logger');
const categoryDao = require('../dao/categoryDao');

const categoryService = {
  // 카테고리 등록
  async reg(params) {
    let inserted = null;
    try {
      inserted = await categoryDao.insertCategory(params);
      logger.debug(`services/categoryService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/categoryService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  // 카테고리 상세 조회
  async getCategoryInfo(params) {
    let result = null;
    try {
      result = await categoryDao.selectCategory(params);
      logger.debug(`services/categoryService.js - getCategoryInfo - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/categoryService.js - getCategoryInfo - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = categoryService;
