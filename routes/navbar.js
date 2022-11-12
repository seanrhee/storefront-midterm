app.post('/login', (req, res) => {
  // set user_id cookie to user.id
  req.session.user_id = 5;

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [5])
  .then(result => {
    console.log(result.rows[0]);

    if (result.rows[0].id === req.session.user_id) {
      res.redirect('/');
      return;
    }
    
    return console.log('this aint right');
  });
})

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
  return;
})