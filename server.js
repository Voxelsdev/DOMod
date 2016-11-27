// eslint-disable-next-line new-cap
'use strict';

const express = require('express');
const app = express();
const knex = require('knex');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').load();
const port = process.env.PORT || 3000;
const compiler = webpack(config);

app.use(passport.initialize());

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.HOST + "/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => {
  // In a typical application, you would want
  // to associate the LinkedIn account with a user record in your database,
  // and return that user instead.
  // change this to knex
  knex('users')
    .select(knex.raw('1=1'))
    .where('id', profile.id)
    .then(exists => {
      if (exists) {
        // user exists..
      } else {
        
      }
    })
  User.findOrCreate({ githubId: profile.id }, (err, user) => done(err, user));
}
));

passport.serializeUser(function(user, done) {        //
  // user has logged in!                             //
  done(null, user);                                  //
});                                                  //
                                                     // This is where we check our user
passport.deserializeUser(function(user, done) {      //
  // user logs out, find the user in the sql db!     //
  done(null, user)                                   //
});                                                  //

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

const parser = require('./src/routes/parser.js');

app.use(parser);

app.use((req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), //failure to authenticate
  function (req,res) {
    // authenticated! sending to the worky thingy.
    res.redirect('/');
  });

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port: ' + port);
});
