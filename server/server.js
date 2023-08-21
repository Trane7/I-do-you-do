const PORT = process.env.PORT  ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')


app.use(cors())

// get all youdos
app.get('/youdos/:userEmail/', async (req, res) => {
    console.log(req)
    //test email for array
    const { userEmail } = req.params
    //this is testing for the data
    try {
       const youdos = await pool.query('SELECT * FROM youdos WHERE user_email = $1', [userEmail])
       res.json(youdos.rows)
    } catch (err) {
        console.log(error)
    }
})



app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
