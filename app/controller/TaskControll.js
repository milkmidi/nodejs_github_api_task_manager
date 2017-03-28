const express = require("express");
const router = express.Router();
const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );
module.exports = function ( app ) {
    console.log( 'TaskControll.js' );
    var removeEmptyProperty = function ( obj ) {
        for ( var a in obj ) {
            if ( obj[ a ] == null || obj[ a ] == undefined ) {
                delete obj[ a ];
            }
        }
    }
    /**
    * @api {get} /api/task 取得目前所有的 task, 新的再第一筆
    * @apiName getTask
    * @apiGroup 03_Task
    * @apiSuccess {String} status ok
    * @apiSuccess {Object[]} result List of Users options (Array of Objects).
    * @apiSampleRequest /api/task
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
        "status": "ok",
        "result": [
            {
                "_id": String,
                "name": String,
                "description": String,
                "user_ref": {
                    "_id": String,
                    "user_id": Number,
                    "name": String
                },
                "date_due": String,
                "tag": [String],
                "complete": boolean
            },
        }
    */

    /** @api {post} /api/task 新增 task
    * @apiName postTask
    * @apiGroup 03_Task
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    *  {
    *      "message": "welcome to github.medialand.tw rest api!",
    *  }
    */
    router.route( '/task' )
        .get(( req, res ) => {
            // console.log( 'req.param.sort', req.query.sort );
            let sort = req.query.sort || 'time_modified';
            let asc = req.query.asc ? "asc" : "desc";
            let sortObj = {};
            sortObj[ sort ] = asc;
            TaskModel.find( {complete:false}, TaskModel.DEFAULT_FIELD )
                .populate( TaskModel.POPULATE )
                .sort( sortObj )                
                // .sort( { time_modified: 'asc' })
                // .sort( { date_due: 'asc' })
                // .sort( { date_due: 'desc' })
                .exec(( err, result ) => {                         
                    if ( err )
                        res.json( { status: "error", error: error });
                    else
                        res.json( { status: "ok", result: result });
                });
        })
        .post( async( req, res ) => {
            var data = req.body;            
            if ( data.date_due ) data.date_due = new Date( data.date_due  );
            if ( data.date_start ) data.date_start = new Date( data.date_start );
            if ( data.date_end ) data.date_end = new Date( data.date_end );
            data.user_created = req.session.objectId;
            data.user_modified = req.session.objectId;
            try {
                var task = new TaskModel( data );
                var result = await task.save();
                res.json( { status: "ok", result: result });                
            } catch ( err ) {
                res.json( { status: "error", error: err });                
            }
        });

    /**
    * @api {get} /api/task/:task_id 取得單一的 task
    * @apiName getTask:task_id
    * @apiGroup 03_Task
    * @apiParam {String} task_id task_object_id.
    * @apiSampleRequest /api/task/:task_id
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    *   {
            "status": "ok",
            "result": [
                {
                    "_id": String,
                    "name": String,
                    "description": String,
                    "user_ref": {
                        "_id": String,
                        "user_id": Number,
                        "name": String
                    },
                    "date_due": String,
                    "tag": [String],
                    "complete": boolean
                },
            ]
        }   
    */
    router.route( '/task/:task_id' )
        .get(( req, res ) => {
            var task_id = req.params.task_id + "";
            TaskModel.findWithRef( { _id: task_id })
                .then( result => res.json( { status: "ok", result: result }) )
                .catch( result => res.json( { status: "error", error: result.message }) );
        })
        .put(( req, res ) => {            
            var task_id = req.params.task_id;
            console.log( '/task put _id:' + task_id );
            let data = req.body;
            let {name, description, user_ref , work_hours , complete , pm_ref} = data;
            let updateData = {
                name , 
                description ,
                user_ref,
                work_hours, 
                complete,
                pm_ref,
                time_modified: Date.now()
            };
            
            if ( data.date_due ) updateData.date_due = new Date(  data.date_due  );
            if ( data.date_start ) updateData.date_start = new Date(  data.date_start  );
            if ( data.date_end ) updateData.date_end = new Date(  data.date_end ) ;

            removeEmptyProperty( updateData );            
            TaskModel.findOneAndUpdate( { _id: task_id }, updateData )
                .then( result => res.json( { status: "ok", result: result }) )
                .catch( result => res.json( { status: "error", error: result.message }) );
        }).
        delete(( req, res ) => {
            var task_id = req.params.task_id;
            console.log('task delete _id:' + task_id);
            TaskModel.remove( { _id: task_id })
                .then( result => res.json( { status: "ok", result: result }) )
                .catch( result => res.json( { status: "error", error: result.message }) );
        });

    /**
    * @api {get} /api/task/user/:user_id 取得指定人員的 tasks
    * @apiName getUserTask
    * @apiGroup 03_Task
    * @apiParam {String} user_id user_object_id.
    * @apiSampleRequest /api/task/user/:user_id
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    *   {
            "status": "ok",
            "result": [
                {
                    "_id": String,
                    "name": String,
                    "description": String,
                    "user_ref": {
                        "_id": String,
                        "user_id": Number,
                        "name": String
                    },
                    "date_due": String,
                    "tag": [String],
                    "complete": boolean
                },
            ]
        }
    * @apiError TaskNotFound
    * @apiErrorExample {json} Error-Response
    *  HTTP/1.1 200 OK
    *     {
    *       "status": "error",
    *       "message":{errorMessage}
    *     }
    */    
    router.route( '/task/user/:user_id' )
        .get(async ( req, res ) => {
            var user_id = req.params.user_id / 1;
            var result = await UserDBModel.findOne( { user_id: user_id });
            var userObjectId = result._id;
            TaskModel.findWithRef( { "user_ref": userObjectId })
                .then( result => res.json( { status: "ok", result: result }) );
        });
    app.use( '/api', router );
}