var express = require('express');
var router = express.Router();

/* GET sentences listing. */
router.get('/', function(req, res, next) {
  res.render('sentences/index', { title: 'Sentences Index', api_key: process.env.API_KEY });
});

/* GET new sentence form. */
router.get('/new', function(req, res, next) {
  res.render('sentences/new', { title: 'New Sentence', api_key: process.env.API_KEY  });
});

/* GET sentence details. */
router.get('/:id', function(req, res, next) {
  res.render('sentences/show', { title: 'View sentence', id: req.params.id, api_key: process.env.API_KEY  });
});

/* GET sentence edit. */
router.get('/:id/edit', function(req, res, next) {
  res.render('sentences/edit', { title: 'Edit sentence', id: req.params.id, api_key: process.env.API_KEY  });
});

module.exports = router;
