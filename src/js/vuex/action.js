function actionLog( value ) {
    console.log( "%cactions:" + value, 'background:#95a5a6;font-size:10px' );
}
// var nodeToken = window.token;
var ajax = function ( options ) {
    return new Promise(( resolve, reject ) => {
        /*if ( nodeToken != "" )
            options.headers = { 'x-access-token': nodeToken };*/
        axios( options ).then(  response => {
            var rs = response.data;
            if ( rs.error ) {
                alert( rs.error );
                reject( rs.error );
            } else {
                resolve( rs );
            }
        }).catch( error => reject( error ) );
    });
}
const actions = {
    notification( {commit }, data ) {        
        actionLog( "notification" );
        commit( 'notification', data );        
    },
    showLoading( { commit}, value ) {        
        commit( 'showLoading', value );        
    },
    isMLUser( { commit, value, email }) {        
        commit( 'isMLUser', value, email );        
        actionLog( "isMLUser" );
    },
    /*token( { commit }, { id_token, email}) {
        actionLog( 'token' );
        // commit( 'showLoading',true );
        return new Promise(( resolve, reject ) => {
            axios.post( '/api/token/', { id_token: id_token, email: email })
                .then(  response=> {
                    var rs = response.data;
                    // console.log( rs );
                    
                    commit( 'showLoading', false );
                    if ( rs.error ) {
                        alert( rs.error );
                        reject( rs.error);
                        
                    } else {
                        nodeToken = rs.result.token;
                        actionLog( 'nodeToken got' );
                        resolve( rs );
                    }
                })
                .catch( error=> {
                    console.error( error );                    
                    reject( error );
                    commit( 'showLoading', false );
                });
        });
    },*/

    api_get( { commit, state}, o ) {
        let url;
        let showLoading = true;
        if ( typeof ( o ) === 'string' ) {
            url = o;
        } else {
            url = o.url;
            showLoading = o.showLoading;
        }
        actionLog( 'api_get ' + url );
        if( showLoading )
            commit( 'showLoading', true );
        return new Promise(( resolve, reject ) => {
            var option = {
                method: 'get',
                url: url,
            };
            ajax( option )
                .then( response => {
                    resolve( response );
                    if( showLoading )
                        commit( 'showLoading', false );
                }).catch(  error=> {
                    reject( error );
                    if( showLoading )
                        commit( 'showLoading', false );
                });
        });
    },
    api_post( { commit, state}, {url , data , method="post" , showLoading=true}) {
        actionLog( 'api_post ' + url );
        if( showLoading )
            commit( 'showLoading', true );
        return new Promise(( resolve, reject ) => {
            var option = {
                method: method,
                url: url,
                data: data,
            }
            ajax( option )
                .then( response => {
                    resolve( response );
                    if( showLoading )
                        commit( 'showLoading', false );
                }).catch(  error=> {
                    reject( error );
                    if( showLoading )
                        commit( 'showLoading', false );
                });
        });
    },
    
};
export default actions;