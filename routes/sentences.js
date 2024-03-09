var express = require('express');
var router = express.Router();

/* GET sentences listing. */
router.get('/', function(req, res, next) {
  res.render('sentences/index', { title: 'Sentences Index'});
});

/* GET new sentence form. */
router.get('/new', function(req, res, next) {
  res.render('sentences/new', { title: 'New Sentence' });
});

/* GET sentence details. */
router.get('/:id', function(req, res, next) {
  res.render('sentences/show', { title: 'View sentence', id: req.params.id });
});

/* GET sentence edit. */
router.get('/:id/edit', function(req, res, next) {
  res.render('sentences/edit', { title: 'Edit sentence', id: req.params.id });
});

module.exports = router;
