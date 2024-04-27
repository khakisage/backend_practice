const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');

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
  // 사용자 로그인
  async login(params) {
    let tokenResult = null;
    let selectedUserInfo = null;
    let response = null;
    try {
      selectedUserInfo = await userDao.selectUser(params);
      if (!selectedUserInfo) {
        const err = new Error(`services/userService.js - selectedUserInfo - ${JSON.stringify(params.userId)}`);
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 조회된 사용자의 패스워드와 params.password 와 비교
    try {
      // eslint-disable-next-line max-len
      const checkPassword = await hashUtil.checkPasswordHash(params.password, selectedUserInfo.password);
      if (checkPassword === false) {
        const err = new Error('services/userService.js - checkPassword - 패스워드가 일치하지 않습니다.');
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 토큰 발급 후 토큰 리턴
    try {
      tokenResult = tokenUtil.makeToken({
        id: selectedUserInfo.id,
        userId: selectedUserInfo.userId,
        role: selectedUserInfo.role,
      });
      logger.debug(`services/userService.js - tokenUtil - ${JSON.stringify(tokenResult)}`);

      response = {
        userId: selectedUserInfo.userId,
        role: selectedUserInfo.role,
        token: tokenResult,
      };
    } catch (err) {
      logger.error(`services/userService.js - tokenUtil - ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
};

module.exports = userService;
