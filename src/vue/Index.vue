<style lang='stylus'>
.index-root{
    width: 100%;
    height: 100%;
    .item_btn {
        position: relative;
        display: block;
        width: 230px;
        height: 290px;
        padding-top: 20px;
        margin: 10px auto;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 6px;
        span{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;
            padding: 15px 20px;
            font-size: 16px;
            font-weight: bold;
            background-color: #f5f5f5;
            border-top: 1px solid #ddd;
            border-radius: 0 0 5px 5px;
        }
    }

    .center{
        text-align: center;
    }
}


</style>
<template lang="pug">
.index-root.container
    .row
        .columns.six
            router-link.item_btn(to='/create')
                span New repository
        .columns.six
            router-link.item_btn(to='/repos')
                span List repository

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import setting from 'util/setting';
export default{
    className:"Child.vue",

    props:{
        appValue:String
    },

    computed: mapGetters([
        'evenOrOdd',
        'fbid'
    ]),
    methods: {



        click: function (){
            this.$emit('child_event',1);
        },
        ...mapActions(['showLoading',"token"])
    },
    data:function (){
        return {
            user_image_url:"",
            login_url: setting.login_url
        }
    },
    mounted: function (){
        console.log( 'mounted' );
        /*window.onSignIn = googleUser=> {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            var id_token = googleUser.getAuthResponse().id_token;

            this.user_image_url = profile.getImageUrl();

            // console.log( id_token );
            // console.log("ID Token: " + id_token);
            this.$store.dispatch( 'token' , id_token ).then( ()=>{

            });
            window.onSignIn = null;
        };*/
        this.show = true;

        if( this.$route.query.code ){
            // this.showLoading( this.$store, true);
            // console.log( this.showLoading );
            // token()
          /*  console.log( this.$route.query );
            this.$store.dispatch( 'token' , this.$route.query.code ).then( ()=>{

            });*/
        }
        /*TweenMax.set( '.path', {visibility:"visible"});
        var tl = new TimelineLite();
        tl.fromTo('.path',3,{drawSVG:0},{drawSVG:"102%"});*/

        /*this.$http.get('/api/repos').then((response) => {
            var rs = response.body;
            // console.log( rs );
        }, (response) => {
            // error callback
        });*/

    },
}
</script>