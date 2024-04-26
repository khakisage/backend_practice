const express = require('express');
const userService = require('../services/userService');
const logger = require('../lib/logger');

const router = express.Router();

// /* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });

// 회원가입
router.post('/', async (req, res, next) => {
  try {
    const params = {
      userId: req.body.userId,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
    };
    logger.info(`routes/users.js - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.userId) {
      const err = new Error('Not allowed null (userId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.password) {
      const err = new Error('Not allowed null (password)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.role) {
      const err = new Error('Not allowed null (role)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.email) {
      const err = new Error('Not allowed null (email)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await userService.reg(params);
    logger.info(`routes/users.js - result - reg - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/user.js - result - reg - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
