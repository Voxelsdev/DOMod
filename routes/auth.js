'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex.js');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const jwt = require('jsonwebtoken');

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
    const email = user.profile.emails[0].value;
    const avatarUrl = JSON.parse(user.profile._raw).avatar_url;
    const githubId = user.profile.id;

    knex('users')
      .select(knex.raw('1=1'))
      .where('email', email)
      .then((result) => {
        if (!result.length) {
          const newUser = {
            email,
            avatarUrl,
            githubId,
          }

          knex('users').insert(decamelizeKeys(newUser), '*')
          .then(users => {
            return users;
          }).catch((err) => {
            next(err);
          });
        }

        const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
        // USER.PROFILE.ID IS THEIR GITHUB ID
        const token = jwt.sign({ userId: user.profile.id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.cookie('token', token, {
          httpOnly: true,
          expires: expiry,
          secure: router.get('env') === 'production',
        });
        res.cookie('loggedIn', 'true');
        res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
  });

router.get('/logout', (req, res) => {
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
  res.cookie('loggedIn', 'false', { expires: expiry});
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
