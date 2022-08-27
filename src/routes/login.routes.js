const express = require('express');
const tokenUtils = require('../utils/token.utils');
const emailValidation = require('../middlewares/email.validation');
const passwordValidation = require('../middlewares/password.validation');

const router = express.Router();

// Requisito 03
router.post('/', emailValidation, passwordValidation, (req, res) => {
  const token = tokenUtils();
  req.headers.authorization = token;
  
  return res.status(200).json({ token });
});

module.exports = router;