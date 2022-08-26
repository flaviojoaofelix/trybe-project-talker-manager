const express = require('express');
const fs = require('../utils/fs.utils');

const router = express.Router();

// Requisito 01
router.get('/', async (req, res) => {
  const talkers = await fs.read();
  res.status(200).json(talkers);
});

// Requisito 02
router.get('/:id', async (req, res) => {
  const talkers = await fs.read();
  const { id } = req.params;

  const talkerById = talkers.find((talker) => talker.id === Number(id));

  if (talkerById) return res.status(200).json(talkerById);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;