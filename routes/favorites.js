const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');

//GET route to show user favorites page
router.get('/', (req, res) => {
  itemQueries.getSavedItems(req.params.user_id)
    .then((item) => {
      // console.log('item is >>>>>>>>>', item)
      db.query(`
      SELECT category
      FROM items
      GROUP BY category
      ORDER BY category`)
        .then(result => {
          const categories = [];

          for (const category of result.rows) {
            categories.push(category.category)
          }

          const templateVars = {
            user: req.session.user_id,
            categories: categories,
            item,
          };

          res.render("favorites", templateVars);
        })
    })
});

//POST route to add to saved_items table after clicking on heart icon
router.post('/', (req, res) => {
  const userId = req.session.user_id;

  if (userId !== 19) {
    res.status(400).send("Please log in to save furniture.");
  } else {
    const item_id = req.body.itemId; //reads data from ajax data { itemId }
    itemQueries.toggleFavoriteItem({ item_id }) //addFavortieItem only accpets an obj so made item_id into obj
  }
})

//POST route to delete from the saved_items table
router.post('/:id/delete', (req, res) => {
  const productId = req.params.id;
  itemQueries.deleteFavItem(productId)
  .then(result => {
    console.log(result)
    res.redirect(`/favorites`)
    return;
  })
})





module.exports = router;
