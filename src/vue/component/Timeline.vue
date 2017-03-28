<style lang="stylus" scoped>
dt.item > .event
    cursor pointer
    &:hover .event-body
        background red
</style>
<template lang="pug">
.timeline
    dl
        //- template(v-for="item,index in list" v-if="index%2==0")
            dt.heading
                .title May 2015
            dt.item
                .marker
                .event
                    .event-body 
                        .header {{item.date_due | date_due}}
                        .text {{item.name}}
            template(v-else)
                dt.item.pos-right
                    .marker
                    .event
                        .event-body 
                            .header {{item.date_due | date_due}}
                            .text {{item.name}}
        dt.item(v-for="item,index in list" , :class="{'pos-right': index%2==1}" @click="itemClick(item)")
            .marker
            .event
                .event-body 
                    .header {{item.date_due | date_due}}
                    .text {{item.name}}
        //- dt.item.pos-right
            .marker
            .event
                .event-body
                    | Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            dt.heading
                .title May 2015
            dt.item
                .marker
                .event
                    .event-body
                        | Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            dt.item.pos-right
                .marker
                .event
                    .event-body
                        | Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    className:"Timeline.vue",
    data(){
        return {
            list:[]
        }
    },
    methods:{
        ...mapActions(['api_get']),
        itemClick(item){
            // console.log( item.name , item._id );
            this.$router.push('/task/detail/' + item._id);
        }
    },
    mounted(){
        this.api_get("/api/task?sort=date_due").then( res =>{
            // console.log( '/api/task length' , res.result.length );
            this.list = res.result;
            // this.setSourceList( res.result );
            // this.updateCurrentUser();
        });
    }
}
</script>