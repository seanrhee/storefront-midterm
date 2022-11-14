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


module.exports = router;
