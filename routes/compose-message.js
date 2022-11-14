const express = require('express');
const router = express.Router()
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: '5432'
});

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user_id
  }
  res.render('compose-message', templateVars);
})

router.post("/messages", (req, res) => {
  // console.log(req.body);
  // const templateVars = { newMessage: req.body.new-message };
  console.log(req.body);
  res.send("Ok");
  // console.log("something");
  // res.redirect('compose-message');
});

module.exports = router;
