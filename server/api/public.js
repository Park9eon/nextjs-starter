const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({ message: 'User is null' });
});

module.exports = router;
