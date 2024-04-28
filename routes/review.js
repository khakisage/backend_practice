const express = require('express');
const reviewService = require('../services/reviewService');
const logger = require('../lib/logger');

const router = express.Router();

// 리뷰 등록
router.post('/', async (req, res, next) => {
  try {
    const params = {
      userId: req.body.userId,
      productId: req.body.productId,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    };
    logger.info(`routes/review.js - insertReview - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.userId) {
      const err = new Error('Not allowed null (userId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.productId) {
      const err = new Error('Not allowed null (productId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    if (!params.content) {
      const err = new Error('Not allowed null (content)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await reviewService.reg(params);
    logger.info(`routes/review.js - insertReview - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/review.js - insertReview - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 상품에 대한 전체 리뷰 조회
router.get('/', async (req, res, next) => {
  try {
    const params = {
      productId: req.query.productId ? req.query.productId : null,
      limit: req.query.limit ? req.query.limit : 10,
      offset: req.query.offset ? req.query.offset : 0,
    };
    const result = await reviewService.getAllList(params);
    logger.info(`routes/review.js - getAllList - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/review.js - getAllList - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리뷰 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const result = await reviewService.getReviewInfo(params);
    logger.info(`routes/review.js - getReviewInfo - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/review.js - getReviewInfo - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리뷰 수정
router.put('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    };
    logger.info(`routes/review.js - updateReview - ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.content) {
      const err = new Error('Not allowed null (content)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await reviewService.editReview(params);
    logger.info(`routes/review.js - updateReview - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/review.js - updateReview - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리뷰 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const result = await reviewService.deleteReview(params);
    logger.info(`routes/review.js - deleteReview - ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`routes/review.js - deleteReview - ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
