const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'jwtsecret';

const options = {
  expiresIn: process.env.JWT_EXPIRESIN || '2h',
};

const tokenUtil = {
  makeToken(user) {
    const payload = {
      id: user.id,
      userId: user.userId,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
