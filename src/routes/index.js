const express = require('express');
const fs = require('../utils/fs.utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const getAllTalkers = await fs.read();
  res.status(200).json(getAllTalkers);
});

module.exports = router;