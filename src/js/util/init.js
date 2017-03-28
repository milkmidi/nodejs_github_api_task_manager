/**
 * init 
 */
function reduce( p , c ) {
    return p + String.fromCharCode( c >> 1 );    
}


/*
var result = []
"debug=medialand".split( '' ).forEach( function ( e ) {
    result.push( e.charCodeAt( 0 ) * 2);
});
result = result.reverse();
console.log(result)
*/

var emptyFun = function () { };
var fakeConsole = { log: emptyFun, warn: emptyFun, error: emptyFun, assert: emptyFun };
var threeX3 = [200, 220, 194, 216, 194, 210, 200, 202, 218, 122, 206, 234, 196, 202, 200].reverse().reduce( reduce, "" );
if ( typeof window.console == "undefined" || typeof window.console.log == "undefined" ) {
    window.console = fakeConsole;
}
window.debug = new RegExp( threeX3 ).test( location.href );    
console.log( 'debug:' + window.debug );
// window.debug = /debug=medialand/.test( location.href );

if ( window.debug ) {
    console.log( "%cDebugMode! " + decodeURIComponent( '%E2%87%91%E2%87%91%E2%87%93%E2%87%93%E2%87%90%E2%87%92%E2%87%90%E2%87%92%E2%92%B7%E2%92%B6' ), 'background: #222; color: #bada55; font-size:20px;' );
} else {
    window.console = fakeConsole;
}