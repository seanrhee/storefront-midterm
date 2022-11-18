const express = require('express');
const router = express.Router()
const db = require('../db/connection');
// const messageQueries = require('../db/queries/messages');


router.get('/:id', (req, res) => {
  // const user = { req.session.user_id };
  const sender = req.params.id;
  const user = 5;

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
            user,
            recipient,
            sender,
          }

          res.render('compose-message', templateVars);
    })
})


router.post('/:id', (req, res) => {
// console.log(req.body.message)
const newMessage = req.body.message;
  // res.redirect('messages');
})



// <form class="form-inline" action="/urls" method="POST">
// <div class="form-group mb-2">
//   <label for="longURL">Enter a URL:</label>
//   <input
//     class="form-control"
//     type="text"
//     name="longURL"
//     placeholder="http://"
//     style="width: 300px; margin: 1em"
//   />
//   <button type="submit" class="btn btn-primary">Submit</button>
// </div>
// </form>


module.exports = router;
