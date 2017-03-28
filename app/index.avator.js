var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var path = require( 'path' );
var session = require( 'express-session' );
var chalk = require( 'chalk' ); 


var config = require( './config' );
const ROOT_PATH = path.resolve( './' );

var DEV_MODE = process.argv.indexOf( 'development' ) > 0;

var app = express();

// console.log('env', app.get('env'));
app.set( 'superSecret', config.secret ); 
app.use( bodyParser.urlencoded( { extended: false }) )	
	.use( bodyParser.json() )
	.set( 'view engine', 'pug' )
	.use( session( {
		secret: '@#$TYHBVGHJIY^TWEYKJHNBGFDWGHJKUYTWE#$%^&*&^%$#', // 建議使用 128 個字符的隨機字符串
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 1000 }
	}) )
	
	.use( express.static( ROOT_PATH + "/dist" ) )
	.use( express.static( ROOT_PATH + '/public' ) );


var MainControll = require( './controller/MainControll' );
MainControll.init( app );
require( "./controller/GithubControll" )( app );
require( "./controller/APIControll" )( app );
// 之後的 api 都要驗証才能呼叫
require( "./controller/AuthenticateControll" )( app );
require( "./controller/AccountControll" )( app );
require( "./controller/TaskControll" )( app );
require( "./controller/RepoControll" )( app );
require( "./controller/TestController" )( app );

app.listen( config.port );

if ( DEV_MODE ) {
	app.locals.pretty = true;
	require( "./dev" )( app );

	var morgan = require( 'morgan' );
	app.use( morgan( 'dev' ) )
	console.log( chalk.black.bgYellow( `http://localhost:${config.port} Start` ) );
} else {
	console.log( chalk.bgCyan.white.bold( `http://localhost:${config.port} Start` ) );
	// MainControll.handlerAllRouter( app );
}