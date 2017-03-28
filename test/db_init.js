console.log('mongo_init.js');
const mongoose = require( 'mongoose' );
const DepartmentDBModel = require( "../app/model/DepartmentDBModel" );
const TaskDBModel = require("../app/model/TaskDBModel");
const UserDBModel = require( "../app/model/UserDBModel" );
const config = require( "../app/config" );
const chai = require( 'chai' );
const chalk = require( 'chalk' );
const assert = chai.assert;
const dbURI = config.database;

function logError( value ) {
    console.log( chalk.bgRed.white.bold(  value ) );
}
describe( 'mongo_init', () => {
    var db;
    before(function(done) {
        mongoose.Promise = global.Promise;
        console.log('beforeEach' );
        if ( mongoose.connection.db )
            return done();
        mongoose.connect( dbURI, done );
        db = mongoose.connection;    
        db.on( 'error', console.error.bind( console, 'connection error:' ) );
    });


    it.only( 'UserDBModel', done => {        
         UserDBModel.findWithRef().then(( err, res ) => {
        //  UserDBModel.find().populate( { path: 'department_ref', select: 'name' } ).exec(( err, res ) => {
            if ( err ) console.log( err );
            console.log( res );
            done(); 
        });        
    });  
    it.skip( 'init data', done => {
        try {
            // db.once( 'open', () => {
                let promiseArr = [];
                let DEPARTMENT_DATA = [
                    { name: "互動技術", _id: "4"  },
                    { name: "專案", _id: "1" }
                ];
                for ( let a of DEPARTMENT_DATA ) {
                    promiseArr.push( new DepartmentDBModel( a ).save() );                    
                }
                
                /*let department = {
                    name: "互動技術",
                    d_id:4
                }*/
                let department_ref = '4';
                let USER_DATA = [
                    {	role:1, name:"Jason" , email:"jason@medialand.tw" , department_ref: department_ref , github_id:19646896 , github_name:"ml-Jason" },
                    {	role:0, name:"milkmidi" , email:"milkmidi@medialand.tw" , department_ref: department_ref , github_id:19482565 , github_name:"ml-milkmidi" },
                    {	role:1, name:"Ash" , email:"ash@medialand.tw" , department_ref: department_ref , github_id:19724832 , github_name:"ml-ash" },
                    {	role:1, name:"MarkVann" , email:"markvann@medialand.tw" , department_ref: department_ref , github_id:19725016 , github_name:"ml-MarkVann" },
                    {	role:1, name:"Sherwin" , email:"sherwin@medialand.tw" , department_ref: department_ref , github_id:19387307 , github_name:"ml-sherwin" },
                    {	role:1, name:"Scars" , email:"scars@medialand.tw" , department_ref: department_ref , github_id:19726995 , github_name:"ml-scars" },
                    {	role:1, name:"Andy" , email:"andy@medialand.tw" , department_ref: department_ref , github_id:11454251 , github_name:"ml-andy" },
                    {	role:1, name:"Mike" , email:"mike@medialand.tw" , department_ref: department_ref , github_id:19724969 , github_name:"ml-Mike" },
                    {	role:1, name:"Walter" , email:"walter@medialand.tw" , department_ref: department_ref , github_id:22760919 , github_name:"ml-walter" }
                ];
                for ( let a of USER_DATA ) {
                    promiseArr.push( new UserDBModel( a ).save() );                    
                }
                var fakePM = { user_id: 99, name: "米安桌", email: "medialand.android@gmail.com", department_ref: '1' };            
                promiseArr.push( new UserDBModel( fakePM ).save() );            
                
                Promise.all( promiseArr ).then( res => {
                    console.log( res );
                    done();
                    db.close();
                }).catch( err => {
                    console.log( err );
                    done();
                    db.close();
                });
            // });            
        } catch (error) {
            
        }
    });


    
});