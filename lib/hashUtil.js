const crypto = require('crypto');

const iterations = process.env.CRYPTO_ITERATIONS ? Number(process.env.CRYPTO_ITERATIONS) : 1000;

const hashUtil = {
  // hash 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      // early return
      if (!password) {
        reject(new Error('입력된 패스워드가 없습니다.'));
      }

      // salt 생성
      const salt = crypto.randomBytes(64).toString('base64');
      // password와 salt 합치기
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;
        const hash = derivedKey.toString('hex');
        const encryptedPassword = `${salt}.${hash}`;
        resolve(encryptedPassword);
      });
    });
  },
  // 검증
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error('패스워드나 암호화된 hash값이 없습니다.'));
      }

      // salt 추출
      const encryptedPasswordSplit = encryptedPassword.split('.');
      if (!(encryptedPasswordSplit && encryptedPasswordSplit.length === 2)) {
        reject(new Error('encryptedPasswordSplit의 길이가 2가 아닙니다.'));
      }
      const salt = encryptedPasswordSplit[0];
      const hash = encryptedPasswordSplit[1];

      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const newHash = derivedKey.toString('hex');

        // 일치 여부 조회
        if (hash === newHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
};

module.exports = hashUtil;
