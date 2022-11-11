const express = require('express');
const router  = express.Router();

router.get('/items', (req, res) => {
  res.render('new-item');
});

module.exports = router;
