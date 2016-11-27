const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const express = require('express');
const passport = require('passport');
require('dotenv').load();
const app = express();
const compiler = webpack(config);

app.use(passport.initialize());

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.HOST + "/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ githubId: profile.id }, (err, user) => done(err, user));
}
));

passport.serializeUser(function(user, done) {
  // user has logged in!
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // user logs out, find the user in the sql db!
  done(null, user)
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

const parser = require('./src/routes/parser.js');

app.use(parser);

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

app.listen(3000, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
