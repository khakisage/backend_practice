const { Category, Product } = require('../models/index');

const categoryDao = {
  // 카테고리 등록
  insertCategory(params) {
    return new Promise((resolve, reject) => {
      Category.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 카테고리 상세 조회
  selectCategory(params) {
    return new Promise((resolve, reject) => {
      Category.findByPk(params.id, {
        include: [
          {
            model: Product,
            as: 'Products',
            attributes: Product.getIncludeAttributes(),
          },
        ],
      })
        .then((selectedCategory) => {
          resolve(selectedCategory);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = categoryDao;
