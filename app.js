// ==================================================
// Require
// ==================================================
const express = require('express')
const mainRouter = require('./routers/main')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')



// ==================================================
// Variables
// ==================================================
const app = express()
const port = process.env.PORT || 80


// ==================================================
// Middleware
// ==================================================

app.use(express.json())
app.use(mainRouter)
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set("view engine", "ejs")


// ==================================================
// Run the Server
// ==================================================
app.listen(port, () => {
    console.log('[+] Server is up on port ' + port)
})