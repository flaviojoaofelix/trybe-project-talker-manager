const express = require('express');

const tokenValidation = require('../middlewares/token.validation');
const nameValidation = require('../middlewares/name.validation');
const ageValidation = require('../middlewares/age.validation');
const talkValidation = require('../middlewares/talk.validation');
const controller = require('../controllers/talker.controller');

const router = express.Router();

router.get('/', controller.read);

router.get('/search',
  tokenValidation,
  controller.readByName);

router.get('/:id', controller.readById);

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  controller.create);

router.put('/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  controller.update);

router.delete('/:id',
  tokenValidation,
  controller.del);

module.exports = router;
