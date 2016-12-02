'use strict';

const authenticate = require('../authenticate');
const express = require('express');
const router = express.Router();

const knex = require('../knex.js');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/user', authenticate, (req, res, next) => {
  const { userId } = req.token;

  knex('users')
    .where('users.github_id', userId)
    .first()
    .then((user) => {
      res.send(camelizeKeys(user));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/snippets', authenticate, (req, res, next) => {
  const { userId } = req.token;

  knex('snippets_users')
    .innerJoin('snippets', 'snippets.id', 'snippets_users.snippet_id')
    .innerJoin('users', 'users.id', 'snippets_users.user_id')
    .where('users.github_id', userId)
    .orderBy('snippets.id', 'ASC')
    .then((rows) => {
      const snippets = camelizeKeys(rows);

      res.send(snippets); // sends all snippets for a user
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
