const Pool = require('pg').Pool
require('dotenv').config()


const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: 'reactblog'
})

module.exports = pool