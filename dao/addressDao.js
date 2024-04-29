const { Address } = require('../models/index');

const addressDao = {
  // 주소 등록
  insertAddress(params) {
    return new Promise((resolve, reject) => {
      Address.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 사용자의 모든 주소 조회
  getAllAddress(params) {
    return new Promise((resolve, reject) => {
      Address.findAll({
        where: {
          userId: params.userId,
        },
      }).then((selectedAddress) => {
        resolve(selectedAddress);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 주소 수정
  editAddress(params) {
    return new Promise((resolve, reject) => {
      Address.update(params, {
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
  // 주소 삭제
  deleteAddress(params) {
    return new Promise((resolve, reject) => {
      Address.destroy({
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

module.exports = addressDao;
