<style lang="stylus" scoped>
.header-nav-bar-root
    padding 0 0 0 180px
    position relative
    // position fixed
    // top 0
    // left 0
// .navbar
//     z-index 2 !important

.breadcrumb
    margin 0
</style>

<template lang="pug">

.header-nav-bar-root
    nav.navbar.navbar-default
        .container-fluid
            .navbar-collapse.collapse.in
                ul.nav.navbar-nav.navbar-mobile
                    li
                        button.sidebar-toggle
                            i.fa.fabars
                ui.nav.navbar-nav.navbar-left
                    //- li.navbar-title
                    <ol class="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Library</a></li>
                        <li class="active">Data</li>
                    </ol>

                ul.nav.navbar-nav.navbar-right
                    li
                        label 06:20
                    li.dropdown.profile
                        a.dropdown-toggle(data-toggle="dropdown") {{userData.name}}
                            //- img.profile-img(src="assets/images/pixel_512.png")
                            .title Profile
                        .dropdown-menu
                            .profile-info
                                h4.username milkmidi
                            ul.action
                                li
                                    a Profile
                                li
                                    a(@click="logout") Logout


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
	className:"HeaderNavBar.vue",
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters(["userData"])
    },
    methods:{
        ...mapActions(['notification','api_post','api_get','showLoading']),
        logout(){
            console.log( 'logout' );
            this.api_get('/api/logout').then( res=>{
                console.log( res );
                this.notification({
                    title:'logout successful!',
                    type: 'success',
                    duration: 3000
                });
                setTimeout(()=>{
                    location.href = "/";
                },3100);
            } );
        }
    },
    mounted(){

    },
    destroyed(){

    },
    components:{

    }
}
</script>