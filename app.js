 'use strict';

 // Import packages
const port = parseInt(process.env.PORT || '4000')
const express = require('express')
const morgan = require('morgan')
const path = require('path');
const filename =path.join(__dirname,'views','index.html')
const router = express.Router()

// App
const app = express()

// Morgan
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static( path.join(__dirname, 'views')))
app.use('/api/employees',require('./routes/employee'))

// // Fail over route
// app.use(function(req, res) {
//     res.status(404).send('Not found');
// });

app.listen(port, function() {
    console.log(`Server is listening on port ${port}`)
});

module.exports = app;