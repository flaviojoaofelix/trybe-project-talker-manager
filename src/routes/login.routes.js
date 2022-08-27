const express = require('express');

const emailValidation = require('../middlewares/email.validation');
const passwordValidation = require('../middlewares/password.validation');
const controller = require('../controllers/login.controller');

const router = express.Router();

// Requisito 03
router.post('/',
  emailValidation,
  passwordValidation,
  controller.login);

module.exports = router;