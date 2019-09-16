 'use strict';

const express = require('express')
const router = express.Router()
const database = require('../models/model')
const validate = require('../middleware/validate')
const fetch = require('node-fetch')
const helper = require('../middleware/helper.js')
const quotesUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
const jokeUrl = "https://icanhazdadjoke.com/"
const path = require('path');
const filename =path.join(__dirname,'../views/','index.html')

 /* GET employees listing. */
router.get('/', async (req, res) => {
    await database.getRecords()
    .then(records =>res.json(records))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })

})

/* Get a single record based on Id*/
router.get('/:id', async (req, res) => {

  const id = req.params.id
    await database.getRecord(id)
    .then(record => res.json(record))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new record */
router.post('/', validate.mustBeLetters, validate.isRoleValid, validate.isDateFormatValid, validate.isdateValid
, validate.checkCeoExisits,async (req, res) => {

    const options = { 
        method: 'GET',
        headers: {
          "Accept" : "application/json" 
        }
      };
     const quoteResponse = await fetch(quotesUrl);
     const jokeResponse = await fetch(jokeUrl, options);
     const joke = await jokeResponse.json();
     const quote = await quoteResponse.json();
     const quoteJson = { favorite_quote:quote.toString() };
     const jokeJson =  { favorite_joke: joke.joke };
    
    // const quoteJson = helper.getRandomQuote()
    // const jokeJson = helper.getRandomJoke()
    
    await database.insertRecord(req.body,quoteJson, jokeJson)
    
    .then(record => res.status(201).json({
        message: `The record #${record.id} has been created`,
        content: record
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})


/* Update a record */
router.put('/:id', validate.mustBeLetters, validate.isDateFormatValid, validate.isRoleValid, validate.isdateValid
, validate.checkCeoExisits, validate.checkFieldsrecord, async (req, res) => {
    const id = req.params.id
    await database.updateRecord(id, req.body)
    .then(record => res.json({
        message: `The record #${id} has been updated`,
        content: record
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


/* Delete a record */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    await database.deleteRecord(id)
    .then(record => res.json({
        message: `The record #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})



// Routes
module.exports = router
