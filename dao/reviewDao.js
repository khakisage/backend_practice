const { Review } = require('../models/index');

const reviewDap = {
  // 리뷰 등록
  insertReview(params) {
    return new Promise((resolve, reject) => {
      Review.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상품에 해당하는 리뷰 조회
  selectReview(params) {
    return new Promise((resolve, reject) => {
      Review.findAll({
        where: {
          productId: params.productId,
        },
      }).then((selectedReview) => {
        resolve(selectedReview);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리뷰 상세 조회
  selectReviewInfo(params) {
    return new Promise((resolve, reject) => {
      Review.findByPk(params.id)
        .then((selectedReview) => {
          resolve(selectedReview);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  // 리뷰 수정
  editReview(params) {
    return new Promise((resolve, reject) => {
      Review.update(params, {
        where: {
          id: params.id,
        },
      }).then((updated) => {
        resolve(updated);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리뷰 삭제
  deleteReview(params) {
    return new Promise((resolve, reject) => {
      Review.destroy({
        where: {
          id: params.id,
        },
      }).then((deleted) => {
        resolve(deleted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = reviewDap;
