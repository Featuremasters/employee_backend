const basicService = require('../services/basic.service');
const db = require('../config/database');
const Basic =require('../model/basic.model')

var baseController = {
    addEmp: addEmp,
    findEmps: findEmps,
    updateEmp: updateEmp,
    deleteById: deleteById
}
//add employee
async function addEmp(req, res) {
    let empData = req.body;
    let doc = req.file.path;
    let emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let phoneRegex = /^[6789]\d{9}$/
  
    // email validation
    if(!emailregex.test(empData.email)){
        return res.status(202).json({ message: "Enter a valid email" })
    }
    const isEmailExist = await Basic.findOne({ where: { email: empData.email } })
    if (isEmailExist) {
        return res.status(202).json({ message: "User with the email is already exist" })
    }
    
   
    // phone number validation
    const isphoneExist = await Basic.findOne({ where: { contactnumber: empData.contactnumber } })
    if (isphoneExist) {
        return res.status(203).json({ message: "User with the phone number is already exist" })
    }
    if (!phoneRegex.test(empData.contactnumber)) {
        return res.status(203).json({ message: "Enter valid phone number" })
    }
    
    

    basicService.add(empData,doc, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



function deleteById(req, res) {
    basicService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "deleted successfully",
                data: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateEmp(req, res) {
    let up = req.body;
    let id = req.params.id;
    basicService.updateUser(up, id, res).
        then((data) => {
            res.status(200).json({
                message: "Updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmps(req, res) {
    basicService.findall().
        then((data) => {
            return res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = baseController;