const logger = require('../lib/logger');
const productDao = require('../dao/productDao');

const productService = {
  // 상품 등록
  async reg(params) {
    let inserted = null;
    try {
      inserted = await productDao.insertProduct(params);
      logger.debug(`services/productService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/productService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  // 전체 상품 조회
  async getAllList(params) {
    let result = null;
    try {
      result = await productDao.getAllProduct(params);
      logger.debug(`services/productService.js - getAllList - ${result}`);
    } catch (err) {
      logger.error(`services/productService.js - getAllList - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  },
  // 상품 상세 조회
  async getProductInfo(params) {
    let result = null;
    try {
      result = await productDao.selectProduct(params);
      logger.debug(`services/productService.js - getProductInfo - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/productService.js - getProductInfo - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 상품 수정
  async editProduct(params) {
    let result = null;
    try {
      result = await productDao.editProduct(params);
      logger.debug(`services/productService.js - updateProduct - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/productService.js - updateProduct - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 상품 삭제
  async deleteProduct(params) {
    let result = null;
    try {
      result = await productDao.deleteProduct(params);
      logger.debug(`services/productService.js - delProduct - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/productService.js - delProduct - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 상품 강제 삭제
  async forceDeleteProduct(params) {
    let result = null;
    try {
      result = await productDao.forceDeleteProduct(params);
      logger.debug(`services/productService.js - forceDelProduct - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/productService.js - forceDelProduct - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = productService;
