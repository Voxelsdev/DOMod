'use strict';

const authenticate = require('../authenticate');

const express = require('express');
const router = express.Router();

const knex = require('../knex.js');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/snippet/:id', authenticate, (req, res, next) => {
  const snippetsId = req.params.id;

  knex('snippets')
    .where('snippets.id', snippetsId)
    .orderBy('snippets.id', 'ASC')
    .then((row) => {
      const snippet = camelizeKeys(row);

      res.send(snippet);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/snippet', authenticate, (req, res, next) => {
  const { userId } = req.token;
  const { html, javascript } = req.body;
  const snippet = { html, javascript };

  knex('snippets')
    .insert(decamelizeKeys(snippet), '*')
    .then((row) => {
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
