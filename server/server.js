const PORT = process.env.PORT  ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')


app.use(cors())

// get all todos
app.get('/todos/:userEmail/', async (req, res) => {
    console.log(req)
    //test email for array
    const { userEmail } = req.params
    //this is testing for the data
    try {
       const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
       res.json(todos.rows)
    } catch (err) {
        console.log(error)
    }
})

// creating a new todo
app.post('/todos', (req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date)

    // this is being passed through the id in the try below
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
