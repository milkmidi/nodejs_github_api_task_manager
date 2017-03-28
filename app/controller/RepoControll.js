const express = require("express");
const router = express.Router();
const moment = require('moment');
/*const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );*/

var GitHubApi = require( "github" );
var config = require( '../config' );
var github = new GitHubApi( {
	debug: false
});
github.authenticate({
    type: "oauth",
    token: config.app_token
});

module.exports = function ( app ) {
    console.log( 'RepoControll.js' );  


    /**
    * @api {get} /api/repos/ 取得github上所有的 repos
    * @apiName getRepos
    * @apiGroup 04_Repos  
    * @apiSampleRequest /api/repos/
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "id": Number,
    *           "name": String,
    *           "full_name": String,
    *           "description": String,
    *       }
    *   ]
    *}
    */
    router.get( '/repos', ( req, res )=> {
        var data = {
            sort: "created",
            page: 1,
            per_page:20
        };
        github.repos.getAll( data, ( err, r ) => err ? res.json( { status: 'error', error: err }) : res.json( { status: "ok", result: r }) );
    });
    
    /**
    * @api {get} /api/repos/:repo_name 取得指定 repos
    * @apiName getReposName
    * @apiGroup 04_Repos  
    * @apiSampleRequest /api/repos/:repo_name
    * @apiParam {String} repo_name repo_name
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "id": Number,
    *           "name": String,
    *           "full_name": String,
    *           "description": String,
    *       }
    *   ]
    *}
    */
    router.get( '/repos/:repo_name', ( req, res )=> {
        console.log( '/repos/' + req.params.repo_name );
        var data = {
            user: config.ml_dev,
            repo : req.params.repo_name
        };
        github.repos.get( data, ( err, r ) => err ? res.json( { status: "error", error: err }) : res.json( { status: "ok", result: r }) );
    });

    /**
    * @api {get} /api/repos/:repo_name 取得指定 repos 的成員
    * @apiName getReposNameCollaborators
    * @apiGroup 04_Repos  
    * @apiSampleRequest /api/repos/:repo_name/collaborators
    * @apiParam {String} repo_name repo_name
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":[
    *       {
    *           "login": String,
    *           "id": Number
    *       }
    *   ]
    * }
    */
    router.get( '/repos/:repo_name/collaborators', ( req, res )=> {
        console.log( '/repos/' + req.params.repo_name +'/collaborators' );
        var data = {
            user: config.ml_dev,
            repo : req.params.repo_name
        };
        github.repos.getCollaborators( data, ( err, r ) => err ? res.json( { status: 'error', error: err }) : res.json( { status: "ok", result: r }) );
    });

    // 建立
    // https://developer.github.com/v3/repos/#create
    router.route( '/create' ).post(( req, res ) => {
        let name = req.body.name;
        let description = req.body.description;
        if ( !name || !description ) {
            res.json( { message: 'Requires' });
            return;
        }
        var data = {
            'name': name,
            'description': description,
            'private': true
        };
        // res.json( {name:name})
        github.repos.create( data, ( err, r ) => err ? res.json( { status: "error", error: err }) : res.json( { status: "ok", result: r }) );
    });

    // 加入 collaborator
    router.route( '/addcollaborator' ).post(( req, res ) => {

        let repo = req.body.repo;
        let userArr = req.body.user.split( "," );

        var c = [];
        for (var i = 0; i < userArr.length; i++) {
            c[i] = addCollaborator(repo, userArr[i]);
        }
        Promise.all( c ).then( r => {
            res.json( { status: "ok", result: r });
        }).catch( err => {
            res.json( { status: "error", error: err });
        });
    });
    function addCollaborator( repo, collabuser ) {
        console.log( 'addCollaborator' , repo , collabuser );
        var data = {
            user: config.ml_dev,
            owner: config.ml_dev,
            repo: repo,
            collabuser: collabuser
        };
        return new Promise((resolve, reject) => {
            github.repos.addCollaborator( data, ( err, res ) => err ? reject( err ) : resolve( res ) );
        });
    }
    app.use( '/api', router );    
}