const PORT = process.env.PORT  ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')

// get all youdos
app.get('/youdos', async (req, res) => {

    try {
        // await 
    } catch (err) {
        console.log(error)
    }
})



app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))
