<!--<style lang="stylus" src="./asset/flatpickr/style/themes/material_green.styl">
</style>-->

<style lang="stylus">
@keyframes flatpickrFadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0,-20px,0)
    }
    to {
        opacity: 1;
        transform: none
    }
}
.flatpickr-calendar.open{
    animation:flatpickrFadeInDown .5s cubic-bezier(0,1,.5,1);
}
.flatpickr-month{
    // padding 10px
}
.flatpickr-next-month, .flatpickr-prev-month {
    svg{
        top:15px
    } 
}
</style>

<template lang="pug">

input(type='text', @change='inputting', @input='inputting' )

</template>

<script>
/*import Flatpickr from './asset/flatpickr/flatpickr';
var zh = require('./asset/flatpickr/zh.js').zh;
Flatpickr.localize(zh);*/
Flatpickr.localize(Flatpickr.l10ns.zh);
export default {
    data() {
        return {
            fp: null,
            message:""
        }
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {}
            }
        }
        /*message: {
            type: String,
            default: () => ''
        }*/
    },
    methods: {
        inputting (e) {
            // this.message = e.target.value;
            // this.$emit('update', e.target.value);
            this.$emit('input', e.target.value );
        }
    },
    mounted () {
        // this.options.locale = 'zh';
        this.options.onChange = (selectedDates, dateStr, instance)=>
            this.$emit('change' , selectedDates, dateStr, instance);
        
        this.fp = new Flatpickr(this.$el, this.options);
        // console.log( this.fp );
    },
    destroyed() {
        this.fp.destroy();
    }
}
</script>

