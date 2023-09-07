const PORT = process.env.PORT  ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
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

// creating a new todo
app.post('/todos', (req, res) => {
    const {user_email, title, progress, date} = req.body
    const id = uuidv4()
    //this runs though all the 5 values
    try {
        pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5',
        [id, user_email, title, progress, date])
    } catch(err) {
        console.log(err)
    }
})



app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
