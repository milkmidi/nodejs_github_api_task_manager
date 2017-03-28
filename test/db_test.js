const config = require("../app/js/config");
console.log('mongo_init.js');
const mongoose = require( 'mongoose' );
const DepartmentDBModel = require( "../app/model/DepartmentDBModel" );
const TaskDBModel = require("../app/model/TaskDBModel");
const UserDBModel = require("../app/model/UserDBModel");
const chai = require( 'chai' );
const chalk = require( 'chalk' );
const assert = chai.assert;
const dbURI = config.database;

function logError( value ) {
    console.log( chalk.bgRed.white.bold(  value ) );
}
describe( 'mongoose_test.js', () => {
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

    /*    
    it.only( 'UserDBModel find All', done => {
        UserDBModel.findWithRef().then(( res ) => {            
            console.log( res );
            done();          
        });
    });
    //*/
    /*
    it( 'UserDBModel find PM', done => {
        UserDBModel.find( { department_ref: "1" }, 'name user_id email').populate( { path: 'department_ref', select: "name" }).then(( res ) => {                        
            console.log( res );
            done();          
        });
    });
    //*/

    //*    
    it( 'Task', done => {
        const POPULATE = [
            { path: 'user_ref', select: "name user_id" },
            { path: 'pm_ref', select: "name user_id" },
        ];
        TaskDBModel.find( {}, TaskDBModel.DEFAULT_FIELD ).populate( POPULATE ).sort( { time_modified: 'desc' }).exec( function ( err, res ) {                         
            console.log(res);
            done();
        });
    });
    //*/

    /*
    it( 'find Task with user', done => {
        UserDBModel.findOne( { name: 'milkmidi' }).then( res => {
            TaskDBModel.find( { user_ref: res._id }).populate( {path:'pm_ref', select:'name'}).then( res => {            
                console.log( res );
                done();          
            });
        });
    });
    //*/

    /*
    it( 'Save, find , Update ,delete Task', done => {    
                   
        var task = new TaskDBModel( {
            name: "Test_Task",
            description: "TestDescription",
            date_due: new Date('2016-12-31'), 
            date_start: new Date('2016-12-1'),
            date_end:new Date('2016-12-30')
        });
        task.save().then( res => {
            assert.equal( res._id, task._id );            
            return TaskDBModel.findOneAndUpdate( { _id: task._id }, { name: "UpdateTask", date_due: new Date( '2017-01-10' ) });
         
        }).then( res => {
            console.log( res );
            return TaskDBModel.remove( { _id: task._id });
        }).then( res => { 
            done();
        } );       
        
    });  
    //*/
   
});