var indexHandler = ( req, res ) => {
    console.log(req.originalUrl);
	if ( !req.session.token ) {
        res.redirect( '/login?redirect_url=' + req.originalUrl );
	} else {
        res.render( 'index', {
            token: req.session.token,
            name: req.session.name,
            email: req.session.email,
            objectId : req.session.objectId,
        });
	}
}
/**
 * @param  {Express} app
 */
export function init( app ) {
    console.log( 'MainControll.js' );
    app
        .get( '/', indexHandler )
        .get( '/login', function ( req, res ) {
            res.render( 'login', { redirect_url: req.query.redirect_url });
        })
        .get( '/task', indexHandler )
        .get( '/repos', indexHandler )
        .get( '/task/:user', indexHandler )
        .get( '/task/detail/:task_id', indexHandler )
        .get( '/user', indexHandler )
        .get( '/test', indexHandler )
    
        /*app.use( function ( req, res, next ) {
            // req.isAuthenticated = true;
            console.log('Time: %d', Date.now() , req.originalUrl);
            next();
        });*/

}
/**
 * @param  {Express} app
 */
export function handlerAllRouter( app ) {
    console.log( 'MainControll.js handlerAllRouter' );
    // 這樣寫在開發發時，會因為沒有 dist 資料夾，然後載入的所有檔案都會變成 404 網頁
    app.use( ( req, res ) => {        
        // res.status( 404 ).send( '404' );
        res.render( '404', { url: req.originalUrl });
    });
}