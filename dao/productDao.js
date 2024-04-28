const { Product } = require('../models/index');

const productDao = {
  // 상품 등록
  insertProduct(params) {
    return new Promise((resolve, reject) => {
      Product.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 전체 상품 조회
  getAllProduct(params) {
    const setQuery = {};
    if (params.id) {
      setQuery.where = {
        ...setQuery.where,
        id: params.id,
      };
    }
    if (params.categoryId) {
      setQuery.where = {
        ...setQuery.where,
        categoryId: params.categoryId,
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: params.name,
      };
    }

    // order by
    setQuery.order = [['id', 'DESC']];
    if (params.limit) {
      setQuery.limit = params.limit;
    }
    if (params.offset) {
      setQuery.offset = params.offset;
    }

    return new Promise((resolve, reject) => {
      Product.findAndCountAll({
        ...setQuery,
      }).then((selectedList) => {
        console.log(selectedList);
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상품 상세 조회
  selectProduct(params) {
    return new Promise((resolve, reject) => {
      Product.findByPk(params.id)
        .then((selectedProduct) => {
          console.log(selectedProduct);
          resolve(selectedProduct);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  // 상품 수정
  editProduct(params) {
    return new Promise((resolve, reject) => {
      Product.update(params, {
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
  // 상품 삭제
  deleteProduct(params) {
    return new Promise((resolve, reject) => {
      Product.destroy({
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
  // 상품 강제 삭제
  forceDeleteProduct(params) {
    return new Promise((resolve, reject) => {
      Product.destroy({
        where: {
          id: params.id,
        },
        force: true,
      }).then((deleted) => {
        resolve(deleted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = productDao;
