const Pool = require("pg").Pool;

const pool = new Pool({
  user: "qinjieng",
  host: "localhost",
  port: 5432,
  database: "qinjieng",
});

module.exports = pool;
