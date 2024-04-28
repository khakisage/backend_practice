const express = require('express');
const productService = require('../services/productService');
const logger = require('../lib/logger');

const router = express.Router();

// 상품 등록
router.post('/', async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
    };
    logger.info(`routes/product.js - createProduct - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.price) {
      const err = new Error('Not allowed null (price)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.categoryId) {
      const err = new Error('Not allowed null (categoryId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await productService.reg(params);
    logger.info(`routes/product.js - createProduct - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/product.js - createProduct - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 전체 상품 조회
router.get('/', async (req, res, next) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      categoryId: req.query.categoryId ? req.query.categoryId : null,
      name: req.query.name ? req.query.name : null,
      limit: req.query.limit ? req.query.limit : 10,
      offset: req.query.offset ? req.query.offset : 0,
    };
    const result = await productService.getAllList(params);
    logger.info(`routes/product.js - getAllList - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/product.js - getAllList - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 상품 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const result = await productService.getProductInfo(params);
    logger.info(`routes/product.js - getProductInfo - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/product.js - getProductInfo - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 상품 수정
router.put('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
    };
    logger.info(`routes/product.js - updateProduct - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await productService.editProduct(params));
  } catch (err) {
    logger.error(`routes/product.js - updateProduct - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 상품 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`routes/product.js - delProduct - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await productService.deleteProduct(params));
  } catch (err) {
    logger.error(`routes/product.js - delProduct - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 상품 강제 삭제
router.delete('/force/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`routes/product.js - delProduct - ${{ reqParams: JSON.stringify(params) }}`);
    res.status(200).json(await productService.deleteProduct(params));
  } catch (err) {
    logger.error(`routes/product.js - delProduct - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
