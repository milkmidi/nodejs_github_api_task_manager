const express = require("express");
const router = express.Router();
const moment = require('moment');
const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );

module.exports = function ( app ) {
    console.log( 'GithubControll.js' );
    router.route( '/githubwebhook' )
        .get(( req, res ) => { 
            res.json( { status: "ok" } );
        } )
        .post(( res, req ) => {
            res.json( {status:"ok",message:"post"})
        } );
    app.use( '/api', router );
}