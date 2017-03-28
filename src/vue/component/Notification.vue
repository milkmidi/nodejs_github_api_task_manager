
<style lang="stylus">
.notifications {
    position: fixed;
    top: 20px;
    right: 0;
    z-index: 999999;
    pointer-events: none;
    /*
        @include tablet() {
        max-width: 320px;
    }
    .notification {
        
    }*/
    .notification {
        pointer-events: all;
        margin: 10px;
        // position: relative;  
        min-width: 240px;
        backface-visibility: hidden;        
        // box-shadow: 0 2px 3px rgba(10,10,10,.2);
        // pointer-events: all;
    }
}
.notification-enter-active, .notification-leave-active {    
    transition: all .5s
}
.notification-enter{
    transform translateY(40px)
}
.notification-enter, .notification-leave-active {
    opacity: 0;
}
.notification-leave-active {
    margin-top -40px !important
}
</style>

<template>
    <transition
        name="notification"
        mode="in-out"
        appear
        
        @after-leave="afterLeave">
        <!-- <div :class="['notification', 'animated', type ? `${type}` : '']" v-if="show" class='ui floating message' >-->
        <div v-if="show" class='notification message alert' :class="typeClass">
            <!--<button class="ui delete touchable" @click="close()"></button>-->
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            
            <strong v-if="title">{{ title }}</strong> {{ message }}
        </div>
    </transition>
</template>

<script>
// https://github.com/vue-bulma/notification
import Vue from 'vue'
export default {
    className:"Notification.vue",
    props: {
        type: {
            type:String,
            default:"success"
        },
        title: String,
        message: String,
        direction: {
            type: String,
            default: 'Right'
        },
        duration: {
            type: Number,
            default: 4500
        },
        container: {
            type: String,
            default: '.notifications'
        }
    },
    data () {
        return {
            $_parent_: null,
            show: true
        }
    },
    computed: {
        typeClass(){
            return "alert-" + this.type;
        }
        /*transition () {
            return `bounce-${this.direction}`;
        },
        enterClass () {
            return `bounceIn${this.direction}`;
        },
        leaveClass () {
            return `bounceOut${this.direction}`;
        },*/
    },
    methods: {
        close () {
            clearTimeout(this.timer)
            this.show = false;
        },
        afterLeave () {
            this.$destroy();
        }
    },
    created () {
        let $parent = this.$parent
        if (!$parent) {
            let parent = document.querySelector(this.container)
            if (!parent) {
                // Lazy creating `div.notifications` container.
                const className = this.container.replace('.', '')
                const Notifications = Vue.extend({
                    name: 'Notifications',
                    render (h) {
                        return h('div', {
                        'class': {
                            [`${className}`]: true
                        }
                        })
                    }
                })
                $parent = new Notifications().$mount()
                document.body.appendChild($parent.$el)
            } else {
                $parent = parent.__vue__
            }
            // Hacked.
            this.$_parent_ = $parent
        }
    },
    mounted () {
        if (this.$_parent_) {
            this.$_parent_.$el.appendChild(this.$el);
            this.$parent = this.$_parent_;
            delete this.$_parent_;
        }
        if (this.duration > 0) {
            this.timer = setTimeout(() => this.close(), this.duration);
        }
    },
    destroyed () {
        this.$el.remove();
    },
    
}
</script>

