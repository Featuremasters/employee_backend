const Sequelize = require('sequelize');
const db = require('../config/database');


const Basic = db.define('basic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pskill: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
       state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{

    alter:true,
});


module.exports = Basic;