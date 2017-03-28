const express = require("express");
const router = express.Router();
module.exports = function ( app ) {
    console.log('TestController.js');
    /**
    * @api {get} /api/ 測試用 - get
    * @apiName getTest
    * @apiGroup 99_Test
    * @apiSuccess {String} message hello world
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "message": "welcome to github.medialand.tw rest api!",
    *     }
    */

    /**
    * @api {post} /api/ 測試用 - post
    * @apiName postTest
    * @apiGroup 99_Test
    * @apiParam {String} value 任意文字.
    * @apiSuccess {String} status ok
    * @apiSuccess {String} message  Lastname of the User.
    * @apiSuccess {String} value 用 Post 傳進來的 value
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "status": "ok",
    *       "message":"post",
    *       "value" : ""
    *     }
    */
    router.route( '/test' )
        .get(( req, res ) => {
            res.json( { status: "ok", message: 'welcome to github.medialand.tw rest api!' });            
        })
        .post( ( req, res ) => {
            var value = req.body.value;
            res.json( { status: "ok", message: 'post', value: value || "" });            
        });
    
    /**
    * @api {get} /api/session 測試Session- get
    * @apiName getTestSession
    * @apiGroup 99_Test
    * @apiParam {String} token
    * @apiSampleRequest /api/test/session
    * @apiSuccess {String} status ok
    * @apiSuccess {visit} message 第${}次來此頁面
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *   "message": "welcome to github.medialand.tw rest api!",
    * }
    */
    router.route( '/test/session' )
        .get(( req, res ) => {
            if ( req.session.isVisit ) {
                req.session.isVisit++;
            } else {
                req.session.isVisit = 1;
            }
            res.json( { status:'ok' ,  message:`第${req.session.isVisit}次來此頁面`});
        })
        .post( ( req, res ) => {
            var value = req.body.value;
            res.json( { status: "ok", message: 'post', value: value || "" });
        });
    app.use( '/api', router );
};