const express = require('express');
const router = express.Router();
const itemQueries = require('../db/queries/items');

//POST route to update the saved_items database and store the values in req.body
router.post('/', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).send("Please log in to post your ad.");
  } else {
    itemQueries.addItem({ ...req.body, owner_id: userId })
      .then(item => {
        res.redirect(`/items/${item.id}`); //redirect the user to show item page
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  };
})




module.exports = router;
