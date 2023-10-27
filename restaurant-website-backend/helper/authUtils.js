const jwt = require("jsonwebtoken");
const Constant = require("./constant");

const PRIVATE_KEY = 'vn-res-key-09-2023';

function createToken(username) {
  const token = jwt.sign({ id: username },
    PRIVATE_KEY,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
  return token;
}

function authenticate(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.send(
        {
          [Constant.RESPONSE.SUCCESS]: false,
          [Constant.RESPONSE.ERROR]: "Please add Authorization to the request header."
        });
    }
    const arr = req.headers.authorization.split(" ");
    if (arr.length !== 2) {
      return res.send({
        [Constant.RESPONSE.SUCCESS]: false,
        [Constant.RESPONSE.ERROR]: "Please use the Bearer scheme."
      })
    }
    const token = arr[1];
    let decoded = jwt.verify(token, PRIVATE_KEY);
    req.username = decoded.username;
    next();

  } catch (error) {
    res.send({
      [Constant.RESPONSE.SUCCESS]: false,
      [Constant.RESPONSE.ERROR]: "Invalid token. Please logout and login again."
    });
  }
}

module.exports = { createToken, authenticate };