<style lang="stylus"></style>

<template lang="pug">

.task-detail-root
    AddNewTask(readonly=true, ref="addNewTask")    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddNewTask from 'AddNewTask';
export default{
	className:"",
    data(){
        return {

        }
    },
    computed:{
        /*task_id(){
            return this.$route.params.task_id;
        }*/
    },
    methods:{
        ...mapActions(['notification','api_post','api_get','showLoading']),
    },
    mounted(){
        // console.log( this.$route.params.task_id );
        var task_id = this.$route.params.task_id;
         if( task_id ){
            this.api_get('/api/task/' + task_id).then( res=>{
                if( res.status == "ok"){
                    var o = res.result[0];
                    this.$refs.addNewTask.setCurrentTaskVO( o );
                }
            });
        }
        // console.log( this.$refs.addNewTask );
    },
    destroyed(){
    },
    components:{
        AddNewTask
    }
}
</script>