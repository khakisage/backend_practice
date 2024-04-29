const tokenUtil = require('./tokenUtil');

const middleware = {
  isLoggedIn(req, res, next) {
    const token = req.headers && req.headers.token;
    // token 유효성 검사
    if (token) {
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        const newToken = tokenUtil.makeToken(decoded);
        res.set('token', newToken);
        req.tokenUser = decoded;

        next();
      } else {
        const err = new Error('유효하지 않은 토큰입니다.');
        res.status(401).json({ err: err.toString() });
      }
    } else {
      const err = new Error('토큰이 없습니다.');
      res.status(401).json({ err: err.toString() });
    }
  },
  // isAdminLoggedIn(req, res, next) {
  //   const token = req.headers && req.headers.token;

  //   // token 유효성 검사
  //   if (token) {
  //     const decoded = tokenUtil.verifyToken(token);

  //     if (decoded) {
  //       const newToken = tokenUtil.makeToken(decoded);
  //       res.set('token', newToken);
  //       req.tokenUser = decoded;

  //       // 여기서 role이 "관리자"인 경우에만 허용
  //       if (decoded.role === '관리자') {
  //         console.log(decoded.role);
  //         next();
  //       } else {
  //         const err = new Error('권한이 없습니다.');
  //         res.status(403).json({ err: err.toString() });
  //       }
  //     } else {
  //       const err = new Error('유효하지 않은 토큰입니다.');
  //       res.status(401).json({ err: err.toString() });
  //     }
  //   } else {
  //     const err = new Error('토큰이 없습니다.');
  //     res.status(401).json({ err: err.toString() });
  //   }
  // },
};

module.exports = middleware;
