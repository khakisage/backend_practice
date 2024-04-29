const express = require('express');
const addressService = require('../services/addressService');
const logger = require('../lib/logger');

const router = express.Router();

// 주소 등록
router.post('/', async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
      postCode: req.body.postCode,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      userId: req.body.userId,
    };
    logger.info(`routes/address.js - createAddress - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.postCode) {
      const err = new Error('Not allowed null (postCode)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.address1) {
      const err = new Error('Not allowed null (address1)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.address2) {
      const err = new Error('Not allowed null (address2)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.address3) {
      const err = new Error('Not allowed null (address3)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.userId) {
      const err = new Error('Not allowed null (userId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await addressService.reg(params);
    logger.info(`routes/address.js - createAddress - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/address.js - createAddress - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
// 사용자의 모든 주소 조회
router.get('/:id', async (req, res, next) => {
  try {
    const params = {
      userId: req.params.id,
    };
    logger.info(`routes/address.js - getAllAddress - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await addressService.getAllAddress(params));
  } catch (err) {
    logger.error(`routes/address.js - getAllAddress - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
// 주소 수정
router.put('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      postCode: req.body.postCode,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      userId: req.body.userId,
    };
    logger.info(`routes/address.js - updateAddress - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await addressService.editAddress(params));
  } catch (err) {
    logger.error(`routes/address.js - updateAddress - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 주소 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`routes/address.js - deleteAddress - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await addressService.deleteAddress(params));
  } catch (err) {
    logger.error(`routes/address.js - deleteAddress - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
