const state = {   
    // token:"",
    /**
     *@type {{UserData}}
     */
    userData: {
        userName:"",
        userEmail:"",
        userPicture:"",  
    },
    showLoading: false,
   
    /** @type {UserDBModel[]} */
    interactiveMembers: [],

    /** @type {UserDBModel[]} */
    pm:[],
};

function mutationsLog( value ) {    
    console.log( "%cmutations:" + value, 'background:#7f8c8d;color:white;font-size:10px' );
}
const mutations = {
    showLoading( state, value ) {
        mutationsLog( "showLoading: " + value );
        state.showLoading = value;
    },
    interactiveMembers( state , value) {
        state.interactiveMembers = value;
        mutationsLog( "interactiveMembers:" +  value.length );
    },
    pms( state, value) {
        state.pm = value;
    },
    authResponseSuccess( state ,  data) {
        // state.userData = data;
        state.userData.userName = data.name;
        state.userData.userEmail = data.email;
        state.userData.userPicture = data.picture;
        /*mutationsLog( "userData id:" + data.id );        
        mutationsLog( "userData name:" + data.name );        
        mutationsLog( "userData email:" + data.email );        
        mutationsLog( "userData imageUrl:" + data.imageUrl );        */
    },
    notification( state, data ) {        
        mutationsLog( "notification:" );        
        // console.log(data);        
    },
    /*token( state, token ) {        
        state.token = token;
        mutationsLog( "token:" );        
        // console.log(data);        
    }*/
    
};


// getters are functions
const getters = {
    showLoading : state => state.showLoading,
    // googleSign : state => !state.userData.id,
    userData : state => state.userData,
    interactiveMembers : state => state.interactiveMembers,
    pm : state => state.pm,
}

import actions from './action.js';
export default new Vuex.Store( {
    state,
    getters,
    actions,
    mutations
});