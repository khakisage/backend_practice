const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const userService = require('../services/userService');

// 로그인
router.post('/', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      password: req.body.password,
    };
    logger.info(`routes/auth.js - login - try - ${{ reqParams: JSON.stringify(params) }}`);

    // 아이디또는 비번이 없는 경우
    if (!params.userId || !params.password) {
      const err = new Error('아이디 또는 비밀번호가 없습니다.');
      logger.error(err.toString());
      res.status(400).json({ err: err.toString() });
    }

    const result = await userService.login(params);
    logger.info(`routes/auth.js - login - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/auth.js - login - ${err.toString()}`);
    res.status(401).json({ err: err.toString() });
  }
});

module.exports = router;
