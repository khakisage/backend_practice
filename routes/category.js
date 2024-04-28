const express = require('express');
const categoryService = require('../services/categoryService');
const logger = require('../lib/logger');

const router = express.Router();

// 카테고리 등록
router.post('/', async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
    };
    logger.info(`routes/category.js - createCategory - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await categoryService.reg(params);
    logger.info(`routes/category.js - createCategory - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/category.js - createCategory - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
// 카테고리 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const result = await categoryService.getCategoryInfo(params);
    logger.info(`routes/category.js - getCategoryInfo - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/category.js - getCategoryInfo - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
