const PORT = process.env.PORT  ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')

// get all youdos
app.get('/youdos', async (req, res) => {

    const userEmail = 'trane@test.com'

    try {
       const youdos = await pool.query('SELECT * FROM youdos WHERE user_email = $1', [userEmail])
       res.json(youdos.rows)
    } catch (err) {
        console.log(error)
    }
})



app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
