<!--    - Browse - GET /users
        - Read - GET /users/:id (specific)
        - Edit - POST /users/:id (specific)
        - Add - POST /users
        - Delete - POST /users/:id/delete
        - ***only need to change the ‘users’ -->

# Resources:
- users
- items
- favourites
- transactions

# Users 
- Browse - GET /users/
- Read - GET /users/:id (read specific user info)
- Edit - POST /users/:id (changing user info)
- Add - POST /users/:id (creating a user)
- Delete - POST /users/:id/delete (user deactivates)

# Items
- Browse - GET /items (browse all items/could be homepage)
- Read - GET /items/:id (individual item page)
- Edit - POST /items/:id (edit item info)
- Add - POST /items (create new item)
- Delete - POST /items/:id/delete (delete item)

# Favourites
- Browse - GET /favourites (browse all favourites)
- Add - POST /favourites/:id (add to favourites)
- Delete - POST /:id/favourites/delete (remove from favourites)

# Transactions
- Browse - GET /transactions (browse all transactions)
- Read - GET /transactions/:id (view individual transaction)
- Edit - POST /transactions/:id (user cannot edit transaction)
- Add - POST /transactions (create new transaction)
- Delete - POST /transactions/:id/delete (user cannot delete transaction log)