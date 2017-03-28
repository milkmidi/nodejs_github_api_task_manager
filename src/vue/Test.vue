<style lang="stylus"></style>

<template lang="pug">
.test-root.app-container
    .row
        button.btn.btn-default(@click='notificationClick') notifiction


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
	className:"Test.vue",
    data(){
        return {

        }
    },
    methods:{
        ...mapActions(['notification']),
        notificationClick(){
            this.notification({
				title:"Title",
                message: 'Login successful!',
                type: 'success',
                duration: 24000
            });
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