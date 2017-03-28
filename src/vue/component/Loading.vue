<style scoped lang="stylus" scoped>
animation_time = 1.5s
@keyframes loader-rotate-plane {
	0% {	transform: perspective(120px) rotateX(0deg) rotateY(0deg);  } 
	50% {	transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);  } 
	100% {	transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);  }
}
@keyframes loader-rotate-plane-spinning {
    0% {  transform: rotate(0deg);	  }
    25% {    transform: rotate(90deg);	  }
    50% {    transform: rotate(0deg);	  }
    75% {    transform: rotate(-90deg);	  }
    75.1% {    transform: rotate(90deg);	  }
    100% {    transform: rotate(180deg);	  }
}
.loading_wrap{
    position fixed
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;    
    background:rgba(255,255,255,0.85)
    // z-index 5000
    z-index 120108
    .loader-container2{        
        transform translateZ(0px)
        position absolute
        top 50%
        left 50%
        margin -40px 0 0 -40px  
        .tp-loader{        
            width 80px
            height 80px
            //background:url("~loader.gif") no-repeat center center
            background-color #fff
            background-size 30px 30px
            box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.15)                
            border-radius 3px            
            animation: loader-rotate-plane animation_time infinite ease-in-out;
        }
        .ring{
            display inline-block
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            position absolute
            transform translateZ(100px)
            top 0
            left 0
            right 0
            bottom 0
            margin auto
            border: 6px solid #7a7a7a;
            border-top-color: #00d1b2;    
            animation: loader-rotate-plane-spinning animation_time infinite ease-in-out    
        }
        /*.loader{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin auto
            width: 100px;
            height: 100px;
            svg path,svg rect{
                fill: #fff;
            }
        }    */
    }
    
}


</style>

<template lang="pug">
transition(name='fade', mode='out-in')
    .loading_wrap(v-show='showLoading')
        .loader-container2
            .tp-loader
                .ring

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
    className:"Loading.vue",
    computed: {        
        ...mapGetters([
            'showLoading'
        ])
    },
}
</script>