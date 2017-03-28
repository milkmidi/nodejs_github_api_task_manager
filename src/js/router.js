import store from "./vuex/store";

// var VueRouter = require( 'vue-router' );
// Vue.use( VueRouter );

const router = new VueRouter( {
    // mode: 'history',
    mode: 'history',
    // mode: __DEV__ ? 'hash' : 'history',
    // mode: 'abstract',
    linkActiveClass: 'active',
    // linkActiveClass: 'is-active',
    //   base: __dirname,
    routes: [
        { path: '/'     , component: require( "Dashboard.vue" ) },
        { path: '/dashboard'     , component: require( "Dashboard.vue" ) },
        // { path: '/create'     , component: require( "CreateNewTask.vue" ) },
        { path: '/repos', component: require( "Repos.vue" ) },
        { path: '/task' , component: require( "Task.vue" ) },
        { path: '/task/detail/:task_id' , component: require( "TaskDetail.vue" ) },
        { path: '/task/add' , component: require( "AddNewTask.vue" ) },
        { path: '/task/:user' , component: require( "Task.vue" ) },
        // { path: '/login', component: require( "GoogleSign.vue" ) },
        { path: '/setting', component: require( "Setting.vue" ) },
        { path: '/user', component: require( "User.vue" ) },
        { path: '/test', component: require( "Test.vue" ) },
        // { path: '*'     , component: require( "404.vue" ) },
    ]
});

// router.beforeEach(( to, from, next ) => {
//     console.log( "Router beforeEach " + 'to:' + to.path + ' from:' + from.path );
//     console.log( 'store.token', store.token );
//     if ( store.token == "" ) {
//         console.log(store);
//         store.emit("api_get","/api/token")
//     }
//     // store
//     /*setTimeout(function() {
//         next();        
//     }, 5000);*/
//     /*if ( store.state.userData.userName === "" && to.path != '/login' ) {        
//         next( {
//             path: "/login",
//             query: {
//                 redirect:to.fullPath
//             }
//         });
//     } else {
//         next();
//     }*/
// });


export default router;