<style lang="stylus" scope>
.flatpickr
    background-color initial !important


</style>

<template lang="pug">
.app-container.add_new_task_root
    DialogModal(title="Delte" , message="刪除這筆資料嗎?" , @ok="dialogModalOKHandler")
    .row
        .col-md-12
            .card
                .card-header {{header}} {{readonly}} {{task_id}}
                .card-body(:class="{__loading:loading}")
                    CardBodyLoader
                    .form.form-horizontal
                        .form-group.has-error
                            label {{taskVO}}
                        .form-group.has-error
                            label.col-md-3.control-label 專案名稱
                            .col-md-9
                                input.form-control(type='text', placeholder='', v-model='taskVO.name')
                        .form-group
                            .col-md-3
                                label.control-label 備註
                                p.control-label-help ( short detail of products , 150 max words )
                            .col-md-9
                                textarea.form-control(placeholder='備註', v-model='taskVO.description' rows="5")
                        .form-group
                            .col-md-3
                                label.control-label 上線日期
                            .col-md-9
                                Flatpickr.flatpickr.form-control(placeholder='上線日期', @change='dateDueChangeHandler' , v-model="taskVO.date_due")
                        .form-group
                            label.col-md-3.control-label 製作時間
                            .col-md-9
                                Flatpickr.flatpickr.form-control(placeholder='工作起日', @change='dateStartChangeHandler', :options='{ "mode": "range"}' , v-model="taskVO.date_start_end")
                        .form-group
                            .col-md-3
                                label.control-label 工作天
                            .col-md-9
                                input.form-control(type='text', placeholder='工作天', readonly="", v-model='diffDayToString')
                        .form-group
                            .col-md-3
                                label.control-label 開發人員
                            .col-md-9
                                select#user_select.select2.form-control(v-model="taskVO.user_ref_id")
                                    option(value="-1") &nbsp;
                                    option(v-for='item in interactiveMembers', :value='item._id') {{item.name}}
                        .form-group
                            .col-md-3
                                label.control-label PM
                            .col-md-9
                                select.select2.form-control(v-model="taskVO.pm_ref_id")
                                    option(value="-1") &nbsp;
                                    option(v-for='item in pm' , :value='item._id') {{item.name}}
                        .form-footer
                            .form-group
                                .col-md-3.col-md-offset-3
                                    button.btn.btn-danger(v-show="!isNewTask" @click="deleteHandler") Delete
                                .col-md-6.text-right
                                    button.btn.btn-primary(@click="addClickHandler") {{submitButtonName}}
                                    button.btn.btn-default Cancel

                        //- .field(v-show="showComplete")
                            label 工時
                                input.input(type="text" , v-model="taskVO.workHours")

                //- .actions
                    .ui.blue.right.labeled.icon.button(@click='showComplete=!showComplete' v-show="!isNewTask") 完工
                        i.icon.money
                    .ui.red.right.labeled.icon.button(@click.prevent='deleteHandler' v-show="!isNewTask && taskVO.workHours ==''") Delete
                        i.icon.warning.sign
                    //- .ui.black.deny.button(v-show="isNewTask") Clear
                    .ui.positive.right.labeled.icon.button(@click.prevent='addClickHandler') {{submitButtonName}}
                        i.checkmark.icon


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Flatpickr from './component/Flatpickr.vue';
import CardBodyLoader from './component/CardBodyLoader';
import DialogModal from './component/DialogModal';
const DEFAULT_TASKVO ={
    _id         :"",
    name        :"",
    description :"",
    date_due    :"",
    date_start  :"",
    date_end    :"",
    user_ref_id :-1,
    pm_ref_id   :-1,
    diffDay     :0,
    workHours   : '',
    complete    :false

};
export default{
	className:"AddNewTask.vue",
    props:{
        readonly:{
            type:Boolean,
            default:false
        },
        /*task_id:{
            type:String,
            default:""
        }*/
    },
    data(){
        return {
            loading      : false,
            isNewTask    :true,
            showComplete : false,
            taskVO:{
                _id         :"",
                name        :"",
                description :"",
                date_due    :"",
                date_start  :"",
                date_end    :"",
                user_ref_id :-1,
                pm_ref_id   :-1,
                diffDay     :0,
                workHours   : '',
                date_start_end: "",
                complete:false
            },
        }
    },
    computed:{
        ...mapGetters(['interactiveMembers','pm']),
        diffDayToString(){
            return this.taskVO.diffDay + '個工作天';
        },
        header(){
            return !this.isNewTask ? "修改專案":"新增專案";
        },
        submitButtonName(){
            return !this.isNewTask ? "Update":"Add";
        },
    },
    watch:{
        /*task_id( value , prev){
            console.log('watch task_id', value );
        }*/
    },
    methods:{
        ...mapActions(['notification','api_post','api_get','showLoading']),
        dialogModalOKHandler(){
            console.log( 'dialogModalOKHandler' );
        },
        voDateToString( dateStr ){
            let d = new Date( dateStr );
            return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        },
        setCurrentTaskVO( vo ){
            console.log( 'setCurrentTaskVO' );
            /*var me = this;
            this.$nextTick( ()=>{
                $('.ui.modal.main')
                    .modal({
                        closable    :false,
                        detachable  :false,
                        onDeny      : ()=> {return false},
                        onApprove   : ()=> {return false},
                        onHidden(){
                            console.log( 'onHidden' );
                            me.$emit('close');
                        }
                    })
                    .modal('show')
                $('.ui.dropdown').dropdown();
            });*/
            /*this.loading = false;
            for(var a in DEFAULT_TASKVO){
                this.taskVO[a] = DEFAULT_TASKVO[a];
            }
            if( vo == null){
                this.isNewTask=true;
                $('.ui.dropdown').dropdown();
                return;
            }*/
            this.taskVO._id = vo._id;
            this.isNewTask = false;
            // console.log( this.taskVO );
            for(var a in vo){
                this.taskVO[a] = vo[a];
            }
            if( vo.date_due ){
                this.taskVO.date_due = this.voDateToString(vo.date_due);
            }
            if( vo.date_start && vo.date_end){
                this.taskVO.date_start_end = this.voDateToString(vo.date_start) +" to " + this.voDateToString(vo.date_end);
                this.parseTimeDiff(vo.date_start , vo.date_end);
            }
            try{
                this.taskVO.user_ref_id = vo.user_ref._id;
            } catch ( error ){ }
            try{
                this.taskVO.pm_ref_id = vo.pm_ref._id;
            } catch ( error ){ }
        },
        showMessageAndClose( {title , message , type ="success" , close = true} ){
            this.notification(
                {
                    title : title,
                    message: message,
                    type: type
                }
            );
            if( close) {
                setTimeout( ()=>{
                    $('.ui.modal.main').modal('hide');
                    this.$emit("reload");
                },200);
            }
        },
        dateDueChangeHandler(selectedDates, dateStr, instance){
            console.log(  selectedDates , dateStr , instance);
            var selected = selectedDates[0];
            if( selected ){
                // this.taskVO.date_display_due = selectedDates[0];
                // this.taskVO.date_due = new Date(selectedDates[0]).getTime();
                // console.log( selected ,dateStr );
            }
        },
        dateStartChangeHandler(selectedDates, dateStr, instance){
            console.log(  selectedDates , dateStr , instance);
            if(selectedDates.length >= 2){
                /*var s = new Date(selectedDates[0]);
                var e = new Date(selectedDates[1]);*/
                this.parseTimeDiff( selectedDates[0] , selectedDates[1]);
                /*this.taskVO.date_start = s.getTime();
                this.taskVO.date_end = e.getTime();
                var timeDiff = Math.abs(s.getTime() - e.getTime());
                this.taskVO.diffDay = (Math.ceil(timeDiff / (1000 * 3600 * 24))+1);*/
            }
        },
        /*
        @param {string} start
        @param {string} end
        */
        parseTimeDiff( start, end){
            // console.log( 'parseTimeDiff' , start, end );
            var s = new Date( start );
            var e = new Date( end );
            this.taskVO.date_start = start.toString();
            this.taskVO.date_end = end.toString();
            var timeDiff = Math.abs(s.getTime() - e.getTime());
            this.taskVO.diffDay = (Math.ceil(timeDiff / (1000 * 3600 * 24))+1);
        },
        deleteHandler(){
            $( '#dialog_modal' ).modal();
            // if( confirm("確認要刪除嗎!") ){
               /* this.loading = true;
                this.api_post( {url:"/api/task/" + this.taskVO._id, method:"delete"} )
                    .then( response => {
                        this.loading = false;
                        if( response.status == "ok"){
                            this.showMessageAndClose( {
                                message: 'delete successful!',
                                type: 'success'
                            });
                        }
                    }).catch( error=> {
                        this.loading = false;
                        // alert(error);
                        // console.log( error );
                    });*/
            // }
        },
        addClickHandler(){
            var {name , description , date_due , date_start, date_end , complete} = this.taskVO;
            var data = {
                name        ,
                description ,
                date_due  ,
                date_start,
                date_end  ,
                complete ,
                pm_ref          :this.taskVO.pm_ref_id,
                user_ref        :this.taskVO.user_ref_id,
            };
            if( data.name == "")
                return;
            this.loading = true;
            console.log( data );
            // console.log( $('#user_select').select2('val') );
            for( var a in data){
                if(data[a]==-1 || data[a] == "" || data[a] == undefined)
                    delete data[a];
            }
            let url = "/api/task";
            let method = "post";
            if( !this.isNewTask ){
                url += "/" + this.taskVO._id;
                method = "put";
            }

            let option = {
                url         :url ,
                data        :data ,
                method      :method ,
                showLoading :false ,
            };

            this.api_post( option )
                .then( response => {
                    this.loading = false;
                    if( response.status == "ok"){
                        this.showMessageAndClose(
                            {
                                title : "Success",
                                message: this.isNewTask ?  'Add Successful!' : 'update Successful!',
                                type: this.isNewTask ? 'success' : 'info'
                            }
                        );
                    }
                }).catch( error=> {
                    this.loading = false;
                });
        }
    },
    mounted(){
        // var me = this;
        // console.log( 'aaaaaa', this.task_id );

        // console.log( this.interactiveMembers.length );
        /*this.$nextTick(()=>{

        });*/

        if( this.interactiveMembers.length == 0){
            this.api_get('/api/user').then( res=>{
                let result = res.result;
                Rx.Observable
                    .fromArray( result )
                    .filter( v=> v.department_ref ? v.department_ref._id == "4" : false)
                    .toArray()
                    .subscribe( res=> this.$store.commit("interactiveMembers",res));
                Rx.Observable
                    .fromArray( result )
                    .filter( v=> v.department_ref ? v.department_ref._id == "1" :false)
                    .toArray()
                    .subscribe( res=> this.$store.commit("pms",res));
                // $( ".select2" ).select2();

                /*if( this.task_id ){
                    this.api_get('/api/task/' + this.task_id).then( res=>{
                        if( res.status == "ok"){
                            var o = res.result[0];
                            this.setCurrentTaskVO( o );
                        }
                    });
                }*/
            });
        }

        /*Flatpickr.localize(Flatpickr.l10ns.zh);
        $( ".flatpickr" ).flatpickr( {
            "mode": "range"
        });    */
    },
    destroyed(){
        // $( ".select2" ).select2('destroy');
    },
    components:{
        Flatpickr,
        CardBodyLoader,
        DialogModal,
        // Datepicker
    }
}
</script>