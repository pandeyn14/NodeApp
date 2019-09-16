function mustBeLetters(req, res, next) {
    const fname = req.body.first_name
    const lname = req.body.last_name
    if(!(fname.match("^[A-z]+$")) || !(lname.match("^[A-z]+$"))){
        res.status(400).json({ message: 'Name must be letters' })
    }
     else {        
        next()
    }
}

function checkCeoExisits(req, res, next) {
    const role = req.params.role
    // if () {
       //  res.status(400).json({ message: 'CEO already exists' })
    // } else {
        next()
    //}
}


function isDateFormatValid(req, res, next) {
    const date = req.body.hire_date
    const formatCheck = /(\d{4})[-\/](\d{2})[-\/](\d{2})/.test(date);
    //basic format check
    if (formatCheck == false) {
        res.status(400).json({ message: 'Hire Date format should be YYYY-MM-DD' })
    }

    const year=date.split("-")[0]
    const month=date.split("-")[1]
    const day=date.split("-")[2]
    const dayobj = new Date(year, month-1, day)

    if ((dayobj.getMonth()+1!=month)||(dayobj.getDate()!=day)||(dayobj.getFullYear()!=year))
    {
    res.status(400).json({ message: 'You have entered Invalid Day, Month, or Year' })
    }
    else {
        next()
    }
}

function isdateValid(req, res, next) {
    let dateEntered = req.body.hire_date
    const currentDate = new Date();
    dateEntered = new Date(dateEntered);

    if(dateEntered > currentDate){
         res.status(400).json({ message: 'You have entered future date' })
     } else {
        next()
    }
}

function isRoleValid( req, res, next) {
   
        role =  req.body.role
        const array = ["ceo","vp","manager", "lackey"]
        let row= array.includes(role);

        if(row == false){
         res.status(400).json({ message: 'Role is invalid' })
        } else {
            next()
        }
}

function checkFieldsrecord(req, res, next) {

    const { first_name, last_name, hire_date, role } = req.body
    if (first_name && last_name && hire_date && role) {
        next()
    } else {
        res.status(400).json({ message: 'fields are invalid' })
    }
}
module.exports = {
    mustBeLetters,
    isdateValid,
    isDateFormatValid,
    checkCeoExisits,
    isRoleValid,
    checkFieldsrecord
}