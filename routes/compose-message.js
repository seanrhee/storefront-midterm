const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');


router.get('/:id', (req, res) => {
  const { user_id } = req.session;
  const sender = req.params.id;

  db.query(`SELECT * FROM users WHERE users.id = ${sender}`)
    .then(result => {
      // console.log(result);
      // rows: [
      //   {
      //     id: 44,
      //     first_name: 'Derward',
      //     last_name: 'Birden',
      //     email: 'dbirden17@vinaora.com',
      //     password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u',
      //     phone_number: '828-516-4687',
      //     street: '3104 Sullivan Lane',
      //     city: 'Kamloops',
      //     province: 'British Columbia',
      //     country: 'Canada',
      //     postal_code: 'H9P3S9'
      //   }
      // ],

      const recipient = result.rows[0];

      const templateVars = {
        user: user_id,
        recipient,
        sender,
      }

      res.render('compose-message', templateVars);
    })
})


router.post('/:id', (req, res) => {
  const { user_id } = req.session;
  const { message }  = req.body;
  console.log(user_id, message);
  console.log(req.params);
  // db.query(`
  // INSERT INTO messages (creator_id, recipient_id, created_at) values (${user}, , ${newMessage}, ${timeago date});
  // `)
  // console.log(req.body.message)
  // db.query()
  // res.redirect('messages');
})



module.exports = router;
