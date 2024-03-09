var express = require('express');
const fs = require('../../services/firestorage.js');
var router = express.Router();

/* GET sentences listing. */
router.get('/', async (req, res, next) => {
  try {
    const query = req.query;
    const sentences = await fs.getSentences(query.orderBy, query.direction, query.cursor, query.page);
    res.json({ sentences: sentences });
  } catch (error) {
    next(error);
  }
});

/* GET sentence data. */
router.get('/:id', async (req, res, next) => {
  const sentence = await fs.getSentence(req.params.id);
  res.json(sentence);
});

/* POST sentence. */
router.post('/', async (req, res, next) => {
  const sentence = processCategories(req.body);
  await fs.createSentence(sentence);
  res.redirect('/sentences');
});

/* PUT (edit) sentence. (Actually is a POST as form does not support PUT) */
router.post('/:id', async (req, res, next) => {
  await fs.updateSentence(req.params.id, processCategories(req.body));
  res.redirect(`/sentences/${req.params.id}`);
});

/* DELETE sentence. */
router.delete('/:id', async (req, res, next) => {
  fs.deleteSentence(req.params.id);
  res.json({ id: req.params.id });
});

function processCategories(sentence) {
  if (sentence.cats === undefined) {
    sentence.cats = ["none"];
  }
  if (typeof sentence.cats === "string") {
    sentence.cats = [sentence.cats];
  }
  return sentence;
}

module.exports = router;
