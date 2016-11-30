'use strict';

const express = require('express');
const router = express.Router();

const knex = require('knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// import CryptoJs from 'crypto-js';

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.HOST + '/auth/github/callback',
  scope: [ 'user:email' ],
}, (accessToken, refreshToken, profile, done) => {
  return done(null, { profile, accessToken, refreshToken });
}));

router.get('/github',
  passport.authenticate('github', {
    session: false,
  }), (req, res) => { console.log('hello world'); });

router.get('/github/callback',
  passport.authenticate('github',
  { failureRedirect: '/login'}), (req, res, next) => {
    const user = req.user;

    console.log(user);

    const userEmail = user.profile.emails[0].value;
    const avatarUrl = JSON.parse(user.profile._raw).avatar_url;

    knex('users')
    .select(knex.raw('1=1'))
    .where('email', userEmail)
    .then(result => {
      if (!result) {
        // creates a new user
        const newUser = {
          userEmail,
          avatarUrl,
        }

        knex('users').insert(decamelizeKeys(newUser), '*')
        .then(users => {
          return users;
        }).catch((err) => {
          next(err);
        });
      }
    })
    .catch(err => {
      next(err);
    });

    res.redirect('/');
  });

module.exports = router;
