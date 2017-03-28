<style lang="stylus">
.sample
    color green
    font-size 2em
</style>

<template lang="pug">

.app-container
    AddNewTaskBTN
    //- .row
        .col-md12
            .test abcdefg
            .sample Sample
    .row
        .col-lg-4.col-md-6.col-sm-6.col-xs-12
            a.card.card-banner.card-green-light
                .card-body
                    i.icon.fa.fa-shopping-basket.fa-4x
                    .content
                        .title 本月上線專案數
                        .value
                            span.sign $
                            | 4520
        .col-lg-4.col-md-6.col-sm-6.col-xs-12
            a.card.card-banner.card-yellow-light
                .card-body
                    i.icon.fa.fa-street-view.fa-4x
                    .content
                        .title 未安排製作人員專案數
                        .value
                            span.sign $
                            | 1
    .row
        .col-xs-12
            .card.card-banner.card-chart.card-green.no-br
                .card-header
                    .card-title
                        .title Top Sale Today
                    ul.card-action
                        li
                            a(href='/')
                                i.fa.fa-refresh
                .card-body
                    .ct-chart-sale
    .row
        .col-xs-12
            Timeline
            

    .row
        .col-xs-12
            .card
                .card-header Line Chart
                .card-body
                    //- .section
                    //-     .section-title Line Chart
                    //-     .section-body
                    .ct-chart.ct-perfect-fourth.ct-chart-line


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Timeline from './component/Timeline';
import AddNewTaskBTN from './component/AddNewTaskBTN';
export default{
	className:"Dashboard.vue",
    data(){
        return {

        }
    },
    methods:{

    },
    mounted(){
        new Chartist.Line('.ct-chart-line', {
            labels: [2015, 2016, 2017, 2018, 2019],
            series: [
                [7684,8356,9108,7508,6988],
                [2961,4500,6302,2433,3594],
                [2961,4500,6302,0,3594],
            ]
        }, {
            showArea: true,
            fullWidth: true,
            lineSmooth: false
        });
    },
    destroyed(){

    },
    components:{
        Timeline,
        AddNewTaskBTN,
    }
}
</script>