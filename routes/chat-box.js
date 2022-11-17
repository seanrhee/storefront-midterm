const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const templateVars = { user: req.session.user_id }

  res.render('chat-box', templateVars);
});

module.exports = router;


router.post('/', (req, res) => {
  const tempUser = 5;
  console.log(req.body);
  const templateVars = { user: tempUser, message: req.body }

  res.render('compose-message', templateVars);
})
