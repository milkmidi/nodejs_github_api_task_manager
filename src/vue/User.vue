<style lang="stylus"></style>

<template lang="pug">

.app-container.add_new_task_root
    .row
        .col-md-12
            .card
                .card-header user
                .card-body.no-padding
                    table.datatable.table.table-striped.primary(cellspacing="0", width="100%")
                        thead
                            tr
                                th name
                                th email
                                th department
                                th time_last_login
                        tbody
                            tr(v-for="item,index in list")
                                th {{item.name}}
                                th {{item.email}}
                                th {{item.department_ref}}
                                th {{item.time_last_login}}


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
	className:"User.vue",
    data(){
        return {
            list:[]
        }
    },
    computed:{
    },
    methods:{
        ...mapActions(['api_get']),
    },
    mounted(){
        this.api_get("/api/user").then( res =>{
            // console.log( res );
            if( res.status == "ok"){
                this.list = res.result;
            }
        });
    },
    destroyed(){

    },
    components:{

    }
}
</script>