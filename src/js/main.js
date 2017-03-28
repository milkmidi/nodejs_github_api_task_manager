
import store from "./vuex/store";




console.log( '--------------------' );
// console.log( '__MY_STR__',__MY_STR__ );
console.log( '__DEV__',__DEV__ );
console.log( 'process.env.NODE_ENV',process.env.NODE_ENV );
console.log( '--------------------' );
require( './main.require.js' );
import router from './router';
import App from "App.vue";
require( "./util/GoogleAuth" );
new Vue( {
    className: "main.js",
    el: '#app',
    // components: { 'app': require( 'App' ) },
    router,
    store,
    render: h => h( App )
    // store
});


