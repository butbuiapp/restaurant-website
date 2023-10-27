const Admin = require('../services/admin');
const { createToken } = require('../helper/authUtils');
const Constant = require('../helper/constant');

module.exports.login = async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let result = await Admin.login(username, password);
    if (!result) {
      res.send({
        [Constant.RESPONSE.SUCCESS]: false,
        [Constant.RESPONSE.ERROR]: "Invalid username or password"
      });
      return;
    }
    // login success
    const token = createToken(username);
    res.send({
      [Constant.RESPONSE.SUCCESS]: true,
      username: username,
      accessToken: token
    });
  } catch (error) {
    next(error);
  }




}