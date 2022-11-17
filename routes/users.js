/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/:id', (req, res) => {
    console.log('im here')
    userQueries.getUsers(req.params.id)
    .then(items => {
    
      const templateVars = {
        user: req.session.user_id,
        itemList: items
      }


        console.log(templateVars.itemList)
    
        res.render('my-ads', templateVars);
        return;

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }

); 

module.exports = router;
