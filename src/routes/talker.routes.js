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

// Requisito 08
router.get('/search',
  tokenValidation,
  async (req, res) => {
    const { q } = req.query;

    const talkers = await fs.read();

    if (!q) {
      return res.status(200).json(talkers);
    }

    const talker = talkers
      .filter((current) => current.name.includes(q));

    if (!talker) {
      return res.status(200).json([]);
    }

    return res.status(200).json(talker);
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

// Requisito 06
router.put('/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const talkers = await fs.read();
    const findTalker = talkers.find((current) => current.id === Number(id));

    if (findTalker) {
      const i = talkers.indexOf(findTalker);
      const talker = { id: Number(id), name, age, talk };
      talkers.splice(i, 1, talker);

      await fs.write(talkers);

      return res.status(200).json(talker);
    }
  });

// Requisito 07
router.delete('/:id',
  tokenValidation,
  async (req, res) => {
    const { id } = req.params;

    const talkers = await fs.read();
    const findTalker = talkers.find((current) => current.id === Number(id));

    if (findTalker) {
      const i = talkers.indexOf(findTalker);
      talkers.splice(i, 1);

      await fs.write(talkers);

      return res.sendStatus(204);
    }
  });

module.exports = router;
