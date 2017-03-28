<style lang="stylus" scoped>
/*aside.app-sidebar{
    z-index:1 !important;
}*/
   
</style>

<template lang="pug">
aside#sidebar.app-sidebar
    .sidebar-header
        a.sidebar-brand(href='#')
            span.highlight Task v0.99
            |  Admin
        button.sidebar-toggle(type='button')
            i.fa.fa-times
    .sidebar-menu
        ul.sidebar-nav
            li
                router-link(to='/')
                    .icon
                        i.fa.fa-tasks(aria-hidden='true')
                    .title Dashboard
            li.dropdown.active
                router-link.dropdown-toggle(to='/task')
                    .icon
                        i.fa.fa-cube(aria-hidden='true')
                    .title Tasks
                .dropdown-menu
                    ul
                        li.section
                            i.fa.fa-file-o(aria-hidden='true')
                            |  Tasks
                        li
                            router-link(to='/task') All
                        li
                            router-link(to='/task/add') Add
                        li.line
                        li                            
                            router-link(to='/task/milkmidi') milkmidi
                        li
                            router-link(to='/task/ash') Ash
                        li
                            router-link(to='/task/Markvann') Markvann
                        li
                            router-link(to='/task/Shiwain') Shiwain
                        li
                            router-link(to='/task/Andy') Andy
                        li
                            router-link(to='/task/walter') walter
                        
                        //- li.section
                        //-     i.fa.fa-file-o(aria-hidden='true')
                        //-     |  Advanced Components
                        //- li
                        //-     a(href='../uikits/pricing-table.html') Pricing Table
                        //- li
                        //-     a(href='../uikits/chart.html') Chart
            li
                router-link(to="/repos")
                    .icon
                        i.fa.fa-file-o(aria-hidden='true')
                    .title Github Repos                
            li
                router-link(to="/user")
                    .icon
                        i.fa.fa-file-o(aria-hidden='true')
                    .title user
    .sidebar-footer
        ul.menu
            li
                a.dropdown-toggle(href='/', data-toggle='dropdown')
                    i.fa.fa-cogs(aria-hidden='true')
            //- li
                //- a(href='#')
                //-     span.flag-icon.flag-icon-th.flag-icon-squared

</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>