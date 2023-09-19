const PORT = process.env.PORT  ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

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
app.post('/todos', async(req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date)

    // this is being passed through the id in the try below
    const id = uuidv4()

    //this runs though all the 5 values
    try {
        const newToDo = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5',
        [id, user_email, title, progress, date])
        res.json(newToDo)
    } catch(err) {
        console.log(err)
    }
})

//edit a todo task
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    //desrtuctuing each variable 
    const {user_email, title, progress, date} = req.body
    try {
        // setting each param 
        const editTodo = 
        await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;', 
        [user_email, title, progress, date, id])
        res.json(editTodo)
    } catch (err) {
        console.log(err)
    }
})

// deleting a todo
app.delete('todos/:id', async (req,res) => {
    const { id } = req.params
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
        res.json(deleteToDo)
    } catch (err) {
        console.log(err)
    }
})

// signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    // Sending data into my database
    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})
        
        res.json({ email, token })

    } catch (err) {
        console.log(error)
        if (err) {
            res.json({ detail: err.detail})
        }
    }
})


// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

    } catch (err) {
        console.log(error)
    }
})



app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
