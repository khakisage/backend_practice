const { User } = require('../models/index');

const userDao = {
  // 회원가입
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        const { password, ...newInserted } = JSON.parse(JSON.stringify(inserted));
        resolve(newInserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 로그인 시 유저 정보 조회
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password', 'role'],
        where: [{ userId: params.userId }],
      }).then((selectedUser) => {
        resolve(selectedUser);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = userDao;
