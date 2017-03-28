const express = require("express");
const moment = require( 'moment' );
const DepartmentModel = require( "../model/DepartmentModel" );
const TaskModel = require("../model/TaskModel");
const AccountModel = require( "../model/AccountModel" );
const request = require( 'request-promise' );
const jwt = require( 'jsonwebtoken' ); // used to create, sign, and verify tokens

const router = express.Router();

module.exports = function ( app ) {
    console.log( 'AuthenticateControll.js' );    
    router.get( '/token', ( req, res ) => {
        var token = req.session.token;
        if( token )
            res.json( { status: "ok", token: req.session.token });
        else
            res.json( { status: "error", error: 'token error' });
    });
    router.get( '/logout', ( req, res ) => {
        req.session.token = null;
        var token = req.session.token;
        res.json( { status: "ok", token: req.session.token });
    });
    /**
    * @api {get} /api/token/:id_token Google 登入後取得 token 驗証
    * @apiName token
    * @apiGroup 01_token
    * @apiSampleRequest /api/token/:id_token
    * @apiParam {String} id_token 登入後取得的 token 值
    * @apiSuccess {String} status
    * @apiSuccess {Object[]} result
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "status": "ok",
    *   "result":
    *       {
    *           "name": String,
    *           "email": String,
    *           "picture": String,
    *           "token":String
    *       }
    *}
    */
    router.post( '/token', async ( req, res ) => {
        var id_token = req.body.id_token;
        var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
        var body = await request.get( url );
        var o = JSON.parse( body );
        // console.log(o);
        if ( o.error_description ) {
            res.json( { "status": "error", error: o.error_description });
        } else {
            if ( /@medialand.tw$/.test( o.email ) ) {
                try {
                    var userResult = await AccountModel.findOneAndUpdate( { email: o.email }, { time_last_login: Date.now() });
                    var token = createToken( o.email );
                    var r = {
                        token: token,
                        name: o.name,
                        email: o.email,
                        picture: o.picture
                    };
                    // console.log(userResult);
                    if ( userResult === null ) {
                        userResult = await new AccountModel( {
                            name: o.name,
                            email: o.email
                        }).save();
                    } else {
                        r.department_ref = userResult.department_ref;
                    }
                    req.session.cookie.expires = false;
                    req.session.token = token;
                    req.session.name = userResult.name;
                    req.session.email = o.email;
                    req.session.objectId = userResult._id;
                    res.json( { "status": "ok", result: r });
                } catch (error) {
                    res.json( { "status": "error", error: error.message });
                }
            } else {
                res.json( { "status": "error", error: 'Failed to authenticate email' , code:1000 });
            }
        }
    });

    // https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
    /**
    * @api {get} /api/3q9527 產生測試用的 token
    * @apiName authenticate
    * @apiGroup 01_token
    * @apiSampleRequest /api/3q9527
    * @apiSuccess {String} status
    * @apiSuccess {String} token
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    *   {
    *       "status": String,
    *       "token":String
    *   }
    */
    router.get( '/3q9527', ( req, res ) => {
        var token = createToken( 'medialand.android@gmail.com' );
        res.json( {
            status: "ok",
            token: token
        });
    });

    function createToken( email , expiresIn = 86400 ) {
        return jwt.sign( { email: email }, app.get( 'superSecret' ), {
            expiresIn: expiresIn // 24 hours
        });
    }

    router.use(( req, res, next ) => {
        var token = req.body.token || req.query.token || req.headers[ 'x-access-token' ] || req.session.token;
        console.log('AuthenticateControll.js verify token');
        if ( token ) {
            jwt.verify( token, app.get( 'superSecret' ), ( err, decoded ) => {
                if ( err ) {
                    return res.json( { status: 'error', error: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status( 403 ).send( {
                status: "error",
                error: 'No token provided.'
            });
        }
    });
    app.use( '/api', router );
}