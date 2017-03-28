<style lang="stylus" scope>
@keyframes floatUp {
    0% {
        opacity:0;
        box-shadow: 0 0 0 rgba(10, 10, 10, 0), 0 0 0 rgba(10, 10, 10, 0), 0 0 0 rgba(10, 10, 10, 0);
        transform: scale(0.86);
    }
    67% {
        opacity:1;
        box-shadow: 0 0 0 rgba(10, 10, 10, 0), 0 5px 10px rgba(10, 10, 10, 0.1), 0 1px 1px rgba(10, 10, 10, 0.2);
        transform: scale(1);
    }
    100% {
        opacity:1;
        box-shadow: 0 20px 60px rgba(10, 10, 10, 0.05), 0 5px 10px rgba(10, 10, 10, 0.1), 0 1px 1px rgba(10, 10, 10, 0.2);
        transform: scale(1);
    }
}
.google-sign-root
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    z-index 1000
    background #00d1b2
    .g-signin2
        display inline-block
    
.kv
    border-radius: 24px;
    display: inline-block;
    width: 240px;
    height: 240px;
    margin-bottom: 40px;
    position: relative;
    vertical-align: top;
    line-height 240px
    background white
    // animation floatUp 1s cubic-bezier(0, 0.71, 0.29, 1) 1.5s
    animation-name floatUp
    animation-duration 1.5s
    animation-delay 0.5s
    animation-fill-mode both
    animation-timing-function cubic-bezier(0, 0.71, 0.29, 1)
    color #00d1b2 !important
    // font-size 26px !important
</style>

<template lang="pug">
.google-sign-root.ui.middle.aligned.center.aligned.grid.teal
    .column        
        .container.has-text-centered
            h1.ui.title.is-1.kv medialand
            div
                .g-signin2(data-onsuccess="onSignIn")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default{
    className:"GoogleSign.vue",
    data(){
        return {
        }
    },
    methods:{
        ...mapActions(['notification','token','api_get']),
    },
    mounted(){
        window.onSignIn = async googleUser=> {
            var profile = googleUser.getBasicProfile();
            // console.log( profile );
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.            
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());
            var id_token = googleUser.getAuthResponse().id_token;            
            var res = await this.token({id_token:id_token , email:profile.getEmail()} );
            if ( res.status === "ok" ) {               
                this.$store.commit( "authResponseSuccess", res.result );

                this.api_get('/api/user/4').then( res=> this.$store.commit('interactiveMembers', res.result) );                
                this.api_get('/api/user/1').then( res=> this.$store.commit('pms', res.result) );                
                
                var redirect = this.$route.query.redirect || '/';
                this.$router.push(redirect);
                this.notification({
                    title:'Login successful!',
                    message: profile.getName(),
                    type: 'success',
                    duration: 3000
                });
            };
            window.onSignIn = null;
            delete window.onSignIn;
        };
        window.google_api_onload = () => {
            console.log('google_api_onload');
        }
    },
    components:{
    }
}
</script>