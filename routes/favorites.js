const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');

//GET route to show user favorites page
router.get('/', (req, res) => {
  console.log('hi')
  itemQueries.getSavedItems(req.params.id)
    .then((item) => {
      console.log(item)
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
  itemQueries.addFavoriteItem({ item_id }) //addFavortieItem only accpets an obj so made item_id into obj
})



//POST route to update the saved_items database and store the values in req.body
// router.post('/', (req, res) => {
//   const userId = req.session.userId;

//   if (!userId) {
//     res.status(401).send("Please log in to view your saved items.");
//   } else {
//     itemQueries.getSavedItem({ ...req.body, owner_id: userId })
//     console.log(item)
//       .then(item => {
//         res.redirect(`/favorites/${item.id}`); //redirect the user to show item page
//       })
//       .catch(e => {
//         console.error(e);
//         res.send(e)
//       });
//   };
// })




module.exports = router;
