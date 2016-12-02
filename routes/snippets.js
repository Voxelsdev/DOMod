'use strict';

const authenticate = require('../authenticate');

const express = require('express');
const router = express.Router();

const knex = require('../knex.js');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/snippet/:id', authenticate, (req, res, next) => {
  const { userId } = req.token;
  const snippetsId = req.params.id;

  knex('snippets')
    .innerJoin('snippets', 'snippets.id', 'snippets_users.snippet_id')
    .innerJoin('users', 'users.id', 'snippets_users.user_id')
    .where('users.id', userId)
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

router.patch('/snippet/:id', authenticate, (req, res, next) => {
  const { userId } = req.token;
  const { html, javascript } = req.body;
  const snippet = { html, javascript };
  const snippetId = req.params.id;

  knex('snippets')
    .innerJoin('snippts', 'snippets.id', 'snippets_users.snippet_id')
    .innerJoin('users', 'users.id', 'snippets_users.user_id')
    .where('users.id', userId)
    .where('snippets.id', snippetId)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      return knex('projects')
        .where('id', snippetId)
        .update(decamelizeKeys(snippet), '*');
    })
    .then((row) => {
      const snippet = camelizeKeys(row);

      res.send(project);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
