const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const templateVars = { user: req.session.user_id }

  res.render('chat-box', templateVars);
});

module.exports = router;
