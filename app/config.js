
var DEV_MODE = process.argv.indexOf( 'development' ) > 0;
var config = {	
	ml_dev: '',
	app_token: '', // github MedialandDev app_token
	secret: 'github.medialand.tw',	//used when we create and verify JSON Web Tokens
	port: 4000,
	database: 'mongodb://siteRootAdmin:medialand27390000@localhost/interactive-task'	
};
module.exports = config;