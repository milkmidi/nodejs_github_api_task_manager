// express + webapck hotreload
// http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack
var chalk = require( 'chalk' );
var http = require( 'http' );
var reload = require( 'reload' );
var str = `
    ########  ######## ##     ## 
    ##     ## ##       ##     ## 
    ##     ## ##       ##     ## 
    ##     ## ######   ##     ## 
    ##     ## ##        ##   ##  
    ##     ## ##         ## ##   
    ########  ########    ###    
    `;

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
module.exports = function ( app ) {
    process.env.NODE_ENV = "development";
    console.log( chalk.black.bgYellow( str )  );
    
    var webpack = require( 'webpack' ),
        webpackDevMiddleware = require( 'webpack-dev-middleware' ),
        webpackHotMiddleware = require( 'webpack-hot-middleware' ),
        config = require( '../webpack.config.js' );
    // config.devtool = "cheap-module-source-map";
    // config.devtool = "eval-source-map";
    config.devtool = "inline-source-map";
    // config.devtool = "cheap-module-eval-source-map";
    // config.devtool = "source-map";
    // config.devtool = "eval";

    for ( var a in config.entry ) {
        config.entry[a].push( hotMiddlewareScript );                
    }
    var compiler = webpack( config );    
    app.use( webpackDevMiddleware( compiler, {
        publicPath: config.output.publicPath,
        // stats: config.stats,
        noInfo: true,
        stats: {
            colors: true
        }
    }) );
    app.use( webpackHotMiddleware( compiler ) );

    
    /*var server = http.createServer(app)    
    // Reload code here 
    reload( server, app );    
    
    server.listen(3000, function(){
        console.log("Web server listening on port " + 3000);
    });*/
}