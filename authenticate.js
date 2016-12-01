'use strict';

const jwt = require('jsonwebtoken');

class check {
  myjwt(req, res, next) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.token = decoded;
      next();
    });
  }
};

export default check;
