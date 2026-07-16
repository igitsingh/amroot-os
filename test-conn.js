const { Client } = require('pg');
require('dotenv').config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => client.query('SELECT count(*) FROM pg_stat_activity;'))
  .then(res => {
    console.log('Active DB connections:', res.rows[0].count);
    return client.end();
  })
  .catch(err => console.error('Error:', err));
