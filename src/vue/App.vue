<style lang="stylus">
</style>

<template lang="pug">

#app.app.app-default
    loading
    navigation        
    header-nav-bar
    transition(name="router" mode="out-in")
        router-view.view
        
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import openNotification from 'util/NotificationUtil.js';
    export default {
        className: "App.vue",
        data() {
            return {                
            }
        },   
        computed: {            
            ...mapGetters([
                'showLoading',
                'googleSign'
            ])
        },         
        methods:{

        },  
        mounted(){
            this.$store.subscribe(( {type,payload}, state) => {
                // console.log(mutation);
                if( type === 'notification')
                    openNotification(payload)
            })
        },
        components:{
            // 'google-sign':require('GoogleSign'),
            'navigation': require('component/Navigation'),
            'loading': require('component/Loading'),
            'header-nav-bar':require("component/HeaderNavBar")
        }
    }
</script>

