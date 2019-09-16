const fs = require('fs')
const uuid = require('uuid');
const fetch = require('node-fetch')
const quotesUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
const jokeUrl = "https://icanhazdadjoke.com/"

const getRandomId = () => {
    const id = uuid.v4()
    return id
}

 function getRandomQuote() {
return new Promise((resolve, reject) =>{
    const row =  fetch(quotesUrl)
    // const quote = await quoteResponse.json()
    // const quoteJson = { favorite_quote:quote.toString() }
    // return quoteJson
    if (!row) {
        reject({
            message: 'Error occurerd in fetching joke',
            status: 400
        })
    }
    resolve(row)
})
    

}

 function getRandomJoke() {

    return new Promise((resolve, reject) => {
        const options = { 
            method: 'GET',
            headers: {
              "Accept" : "application/json" 
            }
          };
         
         const row =  fetch(jokeUrl, options)
        // const joke =  jokeResponse.json()
         //const row =  { favorite_joke: joke.joke } 
         if (!row) {
            reject({
                message: 'Error occurerd in fetching joke',
                status: 400
            })
        }
        resolve(row)
    })
    
}

//const hireDate = () => new Date().toString()

function checkDatabase(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        
        if (!row) {
            reject({
                message: 'Invalid ID',
                status: 400
            })
        }
        resolve(row)
    })
}


function writeToJSON(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function ifCEOExists( role, requestType) {
 
    
        if(!ceo && (requestType =='post'|| requestType == 'put') && role.toLowerCase() == 'ceo'){
            ceo.add("ceo")
           return false;
        }
         else if(ceo && ceo.size  != 0 && (requestType =='post' || requestType=='put' ) && role.toLowerCase() == 'ceo'){
            return true;
         }

        else if(ceo &&  ceo.size  != 0 && requestType == 'delete' && role.toLowerCase() == 'ceo'){
            ceo.delete("ceo")
            return true;
        }
        
        return false
}


module.exports = {
    getRandomId,
    checkDatabase,
    writeToJSON,
    getRandomJoke,
    getRandomQuote,
    ifCEOExists
}