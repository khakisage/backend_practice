const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../lib/logger');

const router = express.Router();

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      const uploadPath = 'uploads/images';
      fs.mkdirSync(uploadPath, { recursive: true });

      done(null, uploadPath);
    },
    filename: (req, file, done) => {
      done(null, +new Date() + path.extname(file.originalname).toLowerCase());
    },
  }),
});

// 이미지 업로드
router.post('/images', imageUpload.array('files'), async (req, res, next) => {
  try {
    const result = req.files.map((file) => `images/${file.filename}`);
    // 에러처리
    if (result.length < 0) {
      const err = new Error('파일업로드에 실패했습니다.(받은 파일이 없습니다.)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }
    logger.info(`router/upload.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/upload.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
