const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');

//GET route to show user favorites page
router.get('/', (req, res) => {
  itemQueries.getSavedItems(req.params.user_id)
    .then((item) => {
      console.log('item is >>>>>>>>>', item)
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

router.post('/', (req, res) => {
  const item_id = req.body.itemId; //reads data from ajax data { itemId }
  console.log('item_id is >>>>>>>>>>>>', item_id)
  itemQueries.toggleFavoriteItem({ item_id }) //addFavortieItem only accpets an obj so made item_id into obj
})

router.post('/:id/delete', (req, res) => {
  const item_id = req.params.id;
  itemQueries.deleteItem({ item_id })

})





module.exports = router;
