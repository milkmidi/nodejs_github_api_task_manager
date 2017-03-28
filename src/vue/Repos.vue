<style lang='stylus'>
.repos-root{    
    .no-padding-bottom{
        padding-bottom 0;
    }
}
</style>
<template lang="pug">
.app-container
    //- section.hero.is-primary.section
        .hero-body
            h2.ui.header Repos

    .ui.secondary.menu
        .right.menu
            .ui.icon.input.right.action
                input(type="text" ,placeholder="Search..." , v-model="inputSearch")
                i.search.icon
    .row
        .col-md-4(v-for='j in list')  
            .card
                .card-header
                    .card-title {{ j.name }}
                .card-block
                    .card-title
                    .card-text {{j.description}}                
                    a.btn.btn-primary Edit

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListLayout from './ListLayout';
export default{
    className:" Repos.vue",   
    mixins:[ListLayout],
    data(){
        return {
            inputSearch:''
        }
    },       
    watch:{
        "inputSearch":function (newValue){
            // console.log( newValue );
            if( newValue == ""){
                this.setList( this.sourceList );
            }else{
                Rx.Observable
                    .fromArray(this.sourceList)
                    .filter( v=> v.name.indexOf(newValue) != -1 )
                    .toArray()
                    .subscribe( res=> this.setList(res) );
            }
        }
    }, 
    methods: {  
        ...mapActions(['api_get']),      
    },
    mounted(){
        this.api_get("/api/repos").then((res)=>{
            console.log( '/api/repos length' , res.result.length );
            this.setSourceList(res.result);
            this.setList( res.result  );
        });       
    },
    destroyed(){
    }
}
</script>