function authenticationMiddleware( roles ) {
    return function ( req, res, next ) {
        if ( req.isAuthenticated ) {
            return next()
        }
        res.redirect( '/' )
    }
}
module.exports = authenticationMiddleware;