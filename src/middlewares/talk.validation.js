const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const rateValidation = (rate) => {
  const validRates = [1, 2, 3, 4, 5];
  
  if (!rate) {
    return ({ message: 'O campo "rate" é obrigatório' });
  }

  if (!validRates.includes(Number(rate))) {
    return ({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return null;
};

const watchedAtValidation = (date) => {
  if (!date) {
    return ({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

  if (!dateRegex.test(date)) {
    return ({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  return null;
};

const validation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  const validateRate = rateValidation(talk.rate);
  const validatewatchedAt = watchedAtValidation(talk.watchedAt);

  if (validateRate) {
    return res.status(400).json(validateRate);
  }

  if (validatewatchedAt) {
    return res.status(400).json(validatewatchedAt);
  }

  next();
};

module.exports = validation;