const logger = require('../lib/logger');
const addressDao = require('../dao/addressDao');

const addressService = {
  // 주소 등록
  async reg(params) {
    let inserted = null;
    try {
      inserted = await addressDao.insertAddress(params);
      logger.debug(`services/addressService.js - insert - ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`services/addressService.js - insert - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  // 사용자의 모든 주소 조회
  async getAllAddress(params) {
    let selectedAddress = null;
    try {
      selectedAddress = await addressDao.getAllAddress(params);
      logger.debug(`services/addressService.js - getAllAddress - ${JSON.stringify(selectedAddress)}`);
    } catch (err) {
      logger.error(`services/addressService.js - getAllAddress - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(selectedAddress);
    });
  },
  // 주소 수정
  async editAddress(params) {
    let updated = null;
    try {
      updated = await addressDao.editAddress(params);
      logger.debug(`services/addressService.js - editAddress - ${JSON.stringify(updated)}`);
    } catch (err) {
      logger.error(`services/addressService.js - editAddress - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(updated);
    });
  },
  // 주소 삭제
  async deleteAddress(params) {
    let deleted = null;
    try {
      deleted = await addressDao.deleteAddress(params);
      logger.debug(`services/addressService.js - deleteAddress - ${JSON.stringify(deleted)}`);
    } catch (err) {
      logger.error(`services/addressService.js - deleteAddress - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve, reject) => {
      resolve(deleted);
    });
  },
};

module.exports = addressService;
