<style lang="stylus" scoped>
.card
    background-color transparent !important
    cursor pointer

    &.user_color
        background-color white !important

    .date_start_end
        font-size 1.2em !important
        // padding 5px 0
        text-align center
    .date_due
        padding 5px 0
        text-align center
        font-size 3em !important


    .header
    .description
        word-break break-all
    .m_user_name
        font-size 2em !important

        // font-weight bold
    .m_image
        height 120px
        background-size contain
        background-position center center
        background-repeat no-repeat



    .over_flow_name
        width 40px
        height 100%
        background red
        text-align center
        p
            // transform-origin left top
            transform rotate(90deg)


</style>

<template lang="pug">
.app-container
    .btn-floating
        .btn-bg
        router-link.btn.btn-default.btn-toggle(to="/task/add")
            i.icon.fa.fa-plus

    //- transition(name='fade')
    //- add-new-task(v-show='showAddNewTask', @close="showAddNewTask=false" ,@reload="reloadAPI" , ref="addNewTask")

    //- section.hero.is-primary.section
        .hero-body
            h2.ui.header Task
            h4.ui.header {{currentPath}} + {{showAddNewTask}}
    //- .ui
        .ui.tabular.menu
            .item(:class="{'active':currentPath=='/task'}")
                router-link(to='/task') All
            .item(:class="{'active':currentPath=='/task/new'}")
                router-link(to='/task/new') New
            .item(v-for='item in interactiveMembers', :class="{'active':currentPath=='/task/'+item.name}")
                router-link(:to="'/task/'+item.name") {{item.name}}
        .ui.secondary.menu
            .item 共{{list.length}}筆資料
            .right.menu
                .item
                    button.orange.ui.right.labeled.icon.button(@click='editClickHandler(null)')
                        i.right.add.icon
                        | Add
                .item
                    .ui.icon.input
                        input(type="text" ,placeholder="Search..." , v-model="inputSearch")
                        i.search.icon
    .row
        .col-md-12
            .card.user_color
                .card-body.app-heading
                    .col-md-8
                        <li class="navbar-search hidden-sm">
                            <input id="search" type="text" placeholder="Search.." autocomplete="off">
                            <button class="btn-search"><i class="fa fa-search"></i></button>
                        </li>

                    .col-md-4.text-right
                        .sort-radios
                            label 排序
                            .radio.radio-inline
                                input#radio5(type='radio', name='radio2', value='option1')
                                label(for='radio5') 修改日期
                            .radio.radio-inline
                                input#radio6(type='radio', name='radio2', value='option2', checked='')
                                label(for='radio6') 上線日期

    .row
        .col-md-4(v-for='j in list' , @click="cardClick(j)")
            .card(:class="j.user_ref | user_ref_name_color")
                .card-header
                    .card-title {{ j.name }}
                    //- ul.card-action
                            li.dropdown
                                a.dropdown-toggle(href='/', data-toggle='dropdown', aria-expanded='false')
                                    i.fa.fa-cogs(aria-hidden='true')
                                ul.dropdown-menu
                                    li
                                        router-link(:to='/task/+j._id') Edit
                                    li
                                        a(href='#') Complete

                .card-block
                    .card-title.date_due {{j.date_due | date_due}}
                    //- .card-title.date_due {{dateyyyymmdd(j.date_due)}}
                    .card-subtitle.date_start_end {{dateStartEnd(j.date_start , j.date_end)}}
                    p.card-text(v-html="description(j.description)")
                    .text-right.pm {{j.pm_ref | user_ref_name}}
                        //- p 工期：{{j.date_start | date_format}} - {{j.date_end | date_format}}

                        //- .ui.right {{ j.user_ref | user_ref_name }}
                        //- .ui.right.floated {{j.date_start | date_format}}-{{j.date_end | date_format}}
                    .text-right.m_user_name.card-link {{ j.user_ref | user_ref_name }}
                    //- .right.floated(v-html="dateFormat(j.date_due)")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {addClass, removeClass} from 'util/util';
import ListLayout from './ListLayout';
export default{
	className:"Task.vue",
    mixins:[ListLayout],
    data(){
        return {
            inputSearch:"",
            currentPath:'',
            currentUID:-1,
            showAddNewTask: false,
        }
    },
    computed:{
        ...mapGetters(['interactiveMembers']),
    },
    watch:{
        inputSearch( value ){
            if( value == ""){
                this.setList( this.sourceList );
            }else{
                Rx.Observable
                    .fromArray(this.sourceList)
                    .filter( v=> v.name.indexOf(value) != -1 )
                    .toArray()
                    .subscribe( res=> this.setList(res) );
            }
        },
        "$route": function (value , prev){
            this.updateCurrentUser( prev );
        }
    },
    methods:{
        ...mapActions(['api_get']),
        description( value ){
            return value ?  value.toString().replace(/\n/g, '<br/>') : "";
        },
        picture( ref ){
            return ref ? ref.picture : "";
        },
        dateStartEnd( start , end ){
            if( start && end ){
                return new Date(start).yyyymmdd() +" - " + new Date(end).yyyymmdd();
            }
            return "";
        },
        /*dateyyyymmdd( value){
            return value ? new Date(value).yyyymmdd() : "";
        },*/
        /*dateFormat(value){
             if ( value ) {
                var d = new Date( value );
                return "上線日："+  "<span class='date_format_year'>" + d.getFullYear() + "</span>/"
                    + "<span class='date_format_month'>" + ( d.getMonth() + 1 ) + "</span>/"
                    + "<span class='date_format_date'>" + d.getDate() + "</span>";
            }
            return "";
        },*/
        updateCurrentUser( prev ){
            this.inputSearch = "";
            var routePath = this.$route.path;
            console.log( routePath );
            this.currentPath = routePath;
            /*if( prev )
                removeClass(document.body , prev.path.split('/')[2]);
            addClass(document.body , routePath.split('/')[2]);*/

            var routePathArr = routePath.split('/');
            // console.log( routePathArr  );
            if( routePathArr.length == 2){ // All
                this.currentPath = '/task';
                this.setList( this.sourceList );
            }else{
                var userName =  routePathArr[2];
                console.log('userName', userName );
                this.currentUID = -1;
                var filterFun;
                if(userName === 'new'){
                    filterFun = v=> v.user_ref == undefined;
                }else{
                    Rx.Observable
                        .fromArray(this.interactiveMembers)
                        .filter( v=> v.name == userName )
                        .subscribe( res=> this.currentUID = res.user_id );
                    console.log( 'currentUID:'+ this.currentUID );
                    filterFun = v=> {
                        if( v.user_ref)
                            return v.user_ref.user_id == this.currentUID
                        return false;
                    };
                }
                Rx.Observable
                    .fromArray(this.sourceList)
                    .filter( filterFun )
                    .toArray()
                    .subscribe( res=> this.setList(res) );
            }

        },
        editClickHandler( item ){
            this.showAddNewTask = true;
            this.$refs.addNewTask.setCurrentTaskVO( item );
        },
        reloadAPI(){
            this.api_get("/api/task").then((res)=>{
                console.log( '/api/task length' , res.result.length );
                this.setSourceList( res.result );
                this.updateCurrentUser();
            });
        },
        cardClick( item ){
            // console.log( item.name , item._id );
            this.$router.push("/task/detail/" + item._id);
        }
    },
    mounted(){
        this.reloadAPI();
    },
    destroyed(){

    },
    components:{
        // 'add-new-task':require("component/AddNewTask")
    }
}
</script>