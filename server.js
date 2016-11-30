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
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('SERIALIZED ', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('DESERIALIZED ', user);
  done(null, user);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('dist'));

const parser = require('./routes/parser.js');

app.use(parser);

// CSRF protection
// app.use((req, res, next) => {
//   if (/json/.test(req.get('Accept'))) {
//     return next();
//   }
//
//   res.sendStatus(406);
// });

const auth = require('./routes/auth');

app.use('/auth', auth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port: ' + port);
});
