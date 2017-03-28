<style lang='stylus' scope>
</style>
<template lang="pug">

.create-root
    section.hero.is-primary.section
        .hero-body
            h2.ui.header Create a new repository
    .ui.container
        .ui.form
            .field.required
                label Repository name
                input.ui.input(type='text', v-model='repos_name')
            .field.required
                label Description
                input.input(type='text', v-model='repos_desc', placeholder='')
            .field(v-for='item in interactiveMembers')
                .ui.checkbox
                    input(type='checkbox', name='collaborator', v-bind:value='item.github_name', v-model='repos_coll')
                    label {{item.name}}                
            button.ui.button Cancel
            button.ui.button.teal(@click='createRepository') Create repository

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
    className:"create.vue",
  
    data:function (){
        return {
            // ml_users:[],
            repos_name:"",
            repos_desc:"",
            repos_coll:[]
        }
    },  
    computed:{
        ...mapGetters(['userData', 'interactiveMembers']),
    },
    methods: {       
        ...mapActions(['showLoading']),
        timeNow:function(){
            var d = new Date();
            var month = d.getMonth() + 1;
            return d.getFullYear() + "_" + (month < 10 ? "0" + month : month ) +"_";            
        },
        createRepository:function(){
            console.log( this.repos_name , this.repos_desc ,this.repos_coll );
            if(this.repos_coll.length == 0){
                return;
            }
            this.showLoading(true);
            axios.post('/api/create', {
                name: this.repos_name,
                description:  this.repos_desc
            })
            .then( (response)=> {
                var rs = response.data;
                if(rs)
                    this.addCollaborator();
                // console.log(response);
            })
            .catch( (error)=> {
                console.log(error);
                this.showLoading(false);        
            });
        },
        addCollaborator: function (){
            // console.log( '/api/addCollaborator' , this.repos_coll.toString() );
            axios.post('api/addcollaborator', {
                repo:   this.repos_name ,
                user:   this.repos_coll.toString()
            })
            .then( (response)=> {
                var rs = response.data;
                this.showLoading(false);
                alert("建立成功!");
                // console.log(response);
            })
            .catch( (error)=> {
                console.log(error);
                this.showLoading(false);        
            });
        }
    },
    mounted: function (){
        console.log( 'mounted' );
        this.repos_name = this.timeNow();
        $('.ui.checkbox').checkbox();
        /*this.$store.dispatch('api_get','/api/ml_users/').then( (res)=>{            
            // console.log( res );
            this.ml_users = res;
        });*/


    /*    this.$http.get('/api/repos').then((response) => {
            var rs = response.body; 
            console.log( rs );
        }, (response) => {
            // error callback
        });*/
        
    },
}
</script>