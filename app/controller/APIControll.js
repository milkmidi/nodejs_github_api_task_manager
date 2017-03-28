const express = require("express");
const router = express.Router();
const config = require("../config");
const mongoose = require( 'mongoose' );
const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );
const moment = require('moment');


module.exports = function ( app ) {
    console.log( 'APIControll.js' );
    mongoose.Promise = global.Promise;
    mongoose.connect( config.database );
    // var db = mongoose.connection;
    
    function dateFormat() {
        var d = new Date();
        return d.getFullYear() + "/" + d.getMonth()        
    }
    router.use( ( req, res, next )=> {
        console.log( req.method , req.originalUrl , moment().format('YYYY/MM/DD hh:mm:ss'));
        next();
    });

    router.route( '/' )
        .get(( req, res ) => {
            res.json( { status: "ok", message: 'welcome to github.medialand.tw rest api!!', token: req.session.token, expires: (req.session.maxAge) });                        
        })
        .post( ( req, res ) => {
            var value = req.body.value;
            res.json( { status: "ok", message: 'post', value: value || "" });            
        });
    app.use( '/api', router );
}