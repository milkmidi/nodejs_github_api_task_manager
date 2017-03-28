const express = require("express");
const router = express.Router();
const moment = require('moment');
const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );

module.exports = function ( app ) {
    console.log( 'AccountControll.js' );  

    /**
    * @api {get} /api/user 取得所有的人員
    * @apiName getUser
    * @apiGroup 02_User     
    * @apiSampleRequest /api/user
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "_id": String,
    *           "user_id": Number,
    *           "name": String,
    *           "email": String,
    *           "department_ref": {
    *               "_id": String,
    *               "name": String
    *           },
    *           "github_id": Number,
    *           "github_name": String
    *       }
    *   ]
    *}
    */
    router.route( '/user' )
        .get( async ( req, res ) => {
            var result = await AccountModel.findWithRef();
            res.json( { status: "ok", result: result });
        })
        .put( async( req, res ) => {
            let userObjectId = req.body.userObjectId;          
            let picture = req.body.picture;
            try {
                var result = await AccountModel.findOneAndUpdate( { _id: userObjectId }, { picture: picture });                
                res.json( { status: "ok", result: result });
            } catch ( err ) {
                res.json( { status: "error", error: err.message });
            }
        })
        .post( ( req, res ) => {
             /** @type {UserVO} */
            /*let data = Object.assign( {}, userVO, {
                name: req.body.name,
                department: req.body.department / 1
            });*/
            // mongoHelper.addUser( data ).then( result => res.json( { status: "ok", result: result }) );
        });
    
    /**
    * @api {get} /api/user/:department_id 取得部門的人員
    * @apiName getUserDepartment
    * @apiGroup 02_User     
    * @apiSampleRequest /api/user/:department_id
    * @apiParam {String} department_id id department unique ID
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "_id": String,
    *           "user_id": Number,
    *           "name": String,
    *           "email": String,
    *           "department_ref": {
    *               "_id": String,
    *               "name": String
    *           },
    *           "github_id": Number,
    *           "github_name": String
    *       }
    *   ]
    *}
    */
    router.route( '/user/:department_id' )
        .get( async ( req, res ) => {
            var department_id = req.params.department_id;
            var result = await AccountModel.findWithRef( { department_ref: department_id });
            res.json( { status: "ok", result: result });
        });
    
    /**
    * @api {get} /api/department 取得部門列表
    * @apiName getDepartment
    * @apiGroup 02_User     
    * @apiSampleRequest /api/department
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "_id": String,
    *           "name": String    
    *       }
    *   ]
    *}
    */
    router.route( '/department/' )
        .get( async ( req, res ) => {
            var result = await DepartmentModel.findWithRef();
            res.json( { status: "ok", result: result });
        });
    router.route( '/department/:department_id' )
        .get( async ( req, res ) => {
            var result = await DepartmentModel.findWithRef();
            res.json( { status: "ok", result: result });
        });
    app.use( '/api', router );    
}