'use strict';

const express = require('express');
const router = express.router();
const knex = require('../../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const passport = require('passport');
const session = require('express-session');
const util = require('util');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
const partials = require('express-partials');

const GITHUB_CLIENT_ID = process.env.CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET;
