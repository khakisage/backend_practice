const logger = require('../lib/logger');
const reviewDao = require('../dao/reviewDao');

const reviewService = {
  // 리뷰 등록
  async reg(params) {
    let inserted = null;
    try {
      inserted = await reviewDao.insertReview(params);
      logger.debug(`services/reviewService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/reviewService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  // 상품에 대한 전체 리뷰 조회
  async getAllList(params) {
    let result = null;
    try {
      result = await reviewDao.selectReview(params);
      logger.debug(`services/reviewService.js - getAllList - ${result}`);
    } catch (err) {
      logger.error(`services/reviewService.js - getAllList - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  },
  // 리뷰 상세 조회
  async getReviewInfo(params) {
    let result = null;
    try {
      result = await reviewDao.selectReviewInfo(params);
      logger.debug(`services/reviewService.js - getReviewInfo - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/reviewService.js - getReviewInfo - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 리뷰 수정
  async editReview(params) {
    let result = null;
    try {
      result = await reviewDao.editReview(params);
      logger.debug(`services/reviewService.js - updateReview - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/reviewService.js - updateReview - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 리뷰 삭제
  async deleteReview(params) {
    let result = null;
    try {
      result = await reviewDao.deleteReview(params);
      logger.debug(`services/reviewService.js - deleteReview - ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`services/reviewService.js - deleteReview - ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = reviewService;
