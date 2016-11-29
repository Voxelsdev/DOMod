'use strict';

const express = require('express');
const router = express.Router();

// const knex = require('knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// import CryptoJs from 'crypto-js';

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.HOST + "/auth/github/callback",
  scope: [ 'user:email' ],
}, (accessToken, refreshToken, profile, done) => {
  return done(null, { profile, accessToken, refreshToken });
}));

router.get('/github',
  passport.authenticate('github', {
    session: false,
  }), (req, res) => { res.json(req.user) });

router.get('/github/callback',
  passport.authenticate('github',
    { failureRedirect: '/login', successRedirect: '/' }), //failure to authenticate
    (req, res, next) => {
      // user authenticated
      console.log(req);
      // res.redirect('/');
      });

  // router.get('/meetup/callback', passport.authenticate('meetup', {
  //   failureRedirect: '/login' }), (req, res, next) => {
  //     const meetupUsername = req.user.profile.username;
  //     const name = req.user.profile._json.name;
  //     const providerAvatar = req.user.profile._json.photo.thumb_link;
  //     const providerId = req.user.profile.id;
  //     const providerRefToken = req.user.refreshToken;
  //     const providerType = req.user.profile.provider;
  //     const providerToken = req.user.accessToken;
  //     const replitTime = Date.now().toString();
  //     const hash = CryptoJS.HmacSHA256(replitTime, process.env.REPLIT_KEY);
  //     const replitHash = CryptoJS.enc.Base64.stringify(hash);
  //
  //     const token = {
  //       msg_mac: replitHash,
  //       time_created: replitTime
  //     }
  //
  //     knex('users')
  //       .where('meetup_username', meetupUsername)
  //       .first()
  //       .then((result) => {
  //         let nextUsers = result;
  //
  //         if (!result) {
  //           const newUser = {
  //             meetupUsername,
  //             name,
  //             replitHash,
  //             replitTime
  //           };
  //
  //           const userRow = decamelizeKeys(newUser);
  //
  //           return knex('users').insert(userRow, '*')
  //             .then((users) => {
  //               const userId = users[0].id;
  //
  //               const defaultSnippets = [
  //                 {
  //                   snippet: '',
  //                   snippetName: 'conditionalConsole',
  //                   snippetType: 'javascript',
  //                   lessonName: 'javascript'
  //                 }];
  //
  //               for (const snippet of defaultSnippets) {
  //                 snippet.userId = userId;
  //                 const row = decamelizeKeys(snippet);
  //
  //                 knex('snippets').insert(row, '*')
  //                   .catch((err) => {
  //                     next(err);
  //                   });
  //               }
  //
  //               return users;
  //             });
  //         }
  //
  //         const updateUser = {
  //           replitHash,
  //           replitTime
  //         };
  //
  //         const row = decamelizeKeys(updateUser);
  //
  //         knex('users')
  //           .update(row, '*')
  //           .where('meetup_username', meetupUsername)
  //           .then((users) => {
  //             return nextUsers = users;
  //           })
  //           .catch((err) => {
  //             next(err);
  //           });
  //
  //         return nextUsers;
  //       })
  //       .then((users) => {
  //         if (users[0]) {
  //           const newIdentity = {
  //             providerAvatar,
  //             providerId,
  //             providerRefToken,
  //             providerType,
  //             providerToken,
  //             userId: users[0].id
  //           }
  //
  //           const identityRow = decamelizeKeys(newIdentity);
  //
  //           return knex('identities').insert(identityRow, '*');
  //         }
  //
  //         return knex('identities')
  //           .where('user_id', users.id)
  //           .first()
  //           .then((users) => {
  //             if (users) {
  //               const updateIdentity = {
  //                 providerAvatar,
  //                 providerId,
  //                 providerRefToken,
  //                 providerToken
  //               }
  //
  //               const updateRow = decamelizeKeys(updateIdentity);
  //
  //               return knex('identities')
  //                 .update(updateRow, '*')
  //                 .where('provider_id', providerId);
  //             }
  //           });
  //       })
  //       .then((identities) => {
  //         res.cookie('providerId', identities[0].provider_id);
  //         res.cookie('userId', identities[0].user_id);
  //         res.cookie('loggedIn', 'true');
  //         res.redirect('/');
  //       })
  //       .catch((err) => {
  //         next(err);
  //       });
  // });
  //
  // router.get('/meetup/events', (req, res, next) => {
  //   request('https://api.meetup.com/Learn-Code-Seattle/events?&sign=true&photo-host=public&page=2')
  //     .then((events) => {
  //       res.send(events)
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // });
  //
  // router.get('/logout', (req, res) => {
  //   req.logout();
  //   res.clearCookie('providerId');
  //   res.clearCookie('userId');
  //   res.clearCookie('loggedIn');
  //   res.redirect('/');
  // });

module.exports = router;
