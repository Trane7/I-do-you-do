const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'trane',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'idoyoudo'
})

module.exports = pool