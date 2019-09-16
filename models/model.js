const path = require('path');
const filename =path.join(__dirname,'database.json')

let database = require(filename)
const helper = require('../middleware/helper.js')
const validate = require('../middleware/validate.js')

function getRecords() {
    return new Promise((resolve, reject) => {
        if (database.length === 0) {
            reject({
                message: 'no records available',
                status: 202
            })
        }
        resolve(database)
    })
}


function getRecord(id) {
    return new Promise((resolve, reject) => {
        helper.checkDatabase(database, id)
        .then(record => resolve(record))
        .catch(err => reject(err))
    })
}

function insertRecord(newrecords, quote, joke) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getRandomId(database) }
        const enteredRole = newrecords.role
        newrecords = { ...id, ...newrecords, ...quote, ...joke}
        if(helper.isRoleValid(enteredRole)){
        database.push(newrecords)
        helper.writeToJSON(filename, database)
        }
        else{
            console.log(err)
        }
        resolve(newrecords)
    })
}

function updateRecord(id, newrecords) {
    return new Promise((resolve, reject) => {
        helper.checkDatabase(database, id)
        .then(records => {
            const index = database.findIndex(p => p.id == records.id)
            id = { id: records.id}
            const quote = { favorite_quote: records.favorite_quote.toString()}
            const joke = { favorite_joke: records.favorite_joke.toString()}
            // id = { id: helper.getRandomId(database)}
            //const quote = { favorite_quote: helper.getRandomQuote()}
            //const joke = { favorite_quote: helper.getRandomJoke()}
 
            database[index] = { ...id,...newrecords, ...quote, ...joke}
            helper.writeToJSON(filename, database)
            resolve(database[index])
        })
        .catch(err => reject(err))
    })
}


function deleteRecord(id) {
    return new Promise((resolve, reject) => {
        helper.checkDatabase(database, id)
        .then(() => {
            database = database.filter(p => p.id !== id)
            helper.writeToJSON(filename, database)
            resolve()
        })
        .catch(err => reject(err))
    })
}





















module.exports = {
    insertRecord,
    getRecords,
    getRecord, 
    updateRecord,
    deleteRecord
}