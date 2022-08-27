const express = require('express');

const fs = require('../utils/fs.utils');
const tokenValidation = require('../middlewares/token.validation');
const nameValidation = require('../middlewares/name.validation');
const ageValidation = require('../middlewares/age.validation');
const talkValidation = require('../middlewares/talk.validation');

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

// Requisito 05
router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  async (req, res) => {
  const talkers = await fs.read();
  const { name, age, talk } = req.body;

  const talker = {
    id: talkers.length + 1,
    name,
    age,
    talk: { ...talk },
  };

  const updatedTalkers = [...talkers, talker];
  await fs.write(updatedTalkers);

  return res.status(201).json(talker);
});

module.exports = router;