const db = require('../connection');

const getMessages = () => {
  return db.query(`
  SELECT message FROM messages;
  `)
  .then((result) => {
    console.log(result.rows);
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getMessages };
