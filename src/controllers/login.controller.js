const tokenUtils = require('../utils/token.util');

const login = (req, res) => {
  const token = tokenUtils();
  req.headers.authorization = token;
  
  return res.status(200).json({ token });
};

module.exports = { login };