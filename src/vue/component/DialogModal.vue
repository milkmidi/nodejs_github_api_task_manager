<template lang="pug">
#dialog_modal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='myModalLabel')
    .modal-dialog
        .modal-content
            .modal-header
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                    span(aria-hidden='true') ×
                h4.modal-title {{title}}
            .modal-body
                p {{message}}
            .modal-footer
                button.btn.btn-sm.btn-default(type='button', data-dismiss='modal', @click="$emit('cancel')") Cancel
                button.btn.btn-sm.btn-success(type='button', data-dismiss='modal' , @click="okClickHandler") OK
</template>

<script>
export default {
    props:{
        title: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            default: "",
        },
    },
    data(){
        return {

        }
    },
    methods:{
        okClickHandler(){
            this.$emit('ok');
        }
    }
}
</script>