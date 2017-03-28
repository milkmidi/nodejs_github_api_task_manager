<style lang="stylus"></style>

<template lang="pug">

.setting-root
    section.hero.is-primary.section
        .hero-body
            h2.ui.header Setting
    .ui.container
        img(src="//lh5.googleusercontent.com/-uX2ffpimIJw/AAAAAAAAAAI/AAAAAAAAABE/42X2IVLbCdg/s96-c/photo.jpg?sz=200")
        .ui.form
            .field
                label UserName
                .ui.transparent.input
                    input(:value="userData.userName" readonly="")
            .field
                label UserEmail
                .ui.transparent.input
                    input(:value="userData.userEmail" readonly="")
            .field
                // photoshop-picker

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { Photoshop } from 'vue-color'
export default{
	className:"Setting.vue",
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters(["userData"])
    },
    methods:{

    },
    mounted(){

    },
    destroyed(){

    },
    components:{
        // 'photoshop-picker': Photoshop
    }
}
</script>