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
const port = process.env.PORT || 3000;
const compiler = webpack(config);

require('dotenv').load();
require('dotenv').config({path: __dirname + '/.env'});

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

const parser = require('./src/routes/parser.js');

app.use(parser);

// CSRF protection
// app.use((req, res, next) => {
//   if (/json/.test(req.get('Accept'))) {
//     return next();
//   }
//   console.log('lol csrf');
//   res.sendStatus(406);
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// const auth = require('./src/routes/auth');

// app.use('/auth', auth);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port: ' + port);
});