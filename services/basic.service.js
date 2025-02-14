const sequelize = require('sequelize');
const db = require('../config/database');
const Basics = require('../model/basic.model')

var basicService = {
    add: add,
    findall:findall,
    updateUser: updateUser,
    deleteById:deleteById
}
async function add(empData, doc, res) {

    const t = await db.transaction();
    try {
        let pp = empData;
        const createUser = await Basics.create({ ...pp, photo:doc }, { transaction: t });
        basic_id = createUser.id
        t.commit();
        return res.status(200).json({ message: "success", data: basic_id })
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ error: error.errors.map((e) => e.message).join(", ") })
    }
}
//get by 
async function findall(req, res) {
    const t = await db.transaction();
    try {
        const [person, metadata] = await db.query("SELECT * FROM public.basics", { transaction: t })
        t.commit();

        return  person;

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}


// Update employee details
async function updateUser(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;
        var basic_up = {
            firstname: pp.firstname,
            lastname: pp.lastname,
            email:pp.email,
            phone:pp.phone,
            dob: pp.dob,
            country: pp.nationality,
            state:pp.state,
            pskill:pp.pskill,
            photo:pp.photo
        }

        const base = await Basics.update({ ...basic_up }, { where: { id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

function deleteById(id) {
    return Basics.destroy({ where: { id: id } });
}
module.exports = basicService; //comand
