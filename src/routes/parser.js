'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const parser = require('himalaya');

router.post('/himalaya', (req, res, next) => {
  const html = req.body;
  const json = parser.parse(html);

  res.send(json);
});

module.exports = router;
