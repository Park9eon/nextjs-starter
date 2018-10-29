const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { displayName } = req.user;
  res.send({ message: `User displayName is ${displayName}` });
});

module.exports = router;
