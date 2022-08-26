const express = require('express');
const tokenUtils = require('../utils/token.utils');

const router = express.Router();

// Requisito 03
router.post('/', (req, res) => {
  const token = tokenUtils();
  return res.status(200).json({ token });
});

module.exports = router;