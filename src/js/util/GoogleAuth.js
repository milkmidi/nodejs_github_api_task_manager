console.log( 'GoogleAuth.js' );
window.onSignIn = googleUser=> {
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();
    var id_token = googleUser.getAuthResponse().id_token; 
    console.log(email);
    axios.post( '/api/token/', { id_token: id_token, email: email })
        .then( response => {
            var rs = response.data;
            /*if ( rs.error ) {
                alert( rs.error );
            } else if(rs.status == 'ok'){
                location.replace( "/" );
            }*/
            console.log( rs,rs.status);
        })
        .catch( error => {
            console.error( error );
    });
};
window.google_api_onload = () => {
    console.log('google_api_onload');
}