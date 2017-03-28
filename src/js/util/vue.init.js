// import * as Vue from 'vue';
Vue.filter( 'date_format', function ( value ) {
    if ( value ) {
        var d = new Date( value );
        return d.getFullYear() + "/" + ( d.getMonth() + 1 ) + '/' + d.getDate();
    }
    return "";
});

Vue.filter( 'is_null', value => value ? value : "" );
// Vue.filter( 'enterLine', value => value  );
Vue.filter( 'user_ref_name', ref => ref ? ref.name : "" );
Vue.filter( 'user_ref_name_color', ref => ref ? ref.name +" user_color" : "" );
Vue.filter( 'date_due', value => value ? new Date( value ).yyyymmdd() : "" );
Vue.filter( 'date_start_end', ( start, end ) => {
    if( start && end ){
        return new Date(start).yyyymmdd() +" - " + new Date(end).yyyymmdd();
    }
    return "";
} );
// Vue.filter( 'user_ref_picture', ref => ref ? ref.picture : "" );



// Vue.mixin( {
//     /*created: function () {
//         var className = this.$options[ 'className' ];
//         console.log( "%c1:" + 'created ' + className, 'background:#1abc9c;color:white;font-size:10px' );
//     },*/
//     mounted: function () {
//         var className = this.$options['className'];
//         console.log( "%c1:" + 'mounted ' + className, 'background:#9b59b6;color:white;font-size:10px' );
//     },
//     destroyed: function () {
//         var className = this.$options['className'];
//         console.log( "%c1:" + 'destroyed ' + className, 'background:#34495e;color:white;font-size:10px' );
//     }
// });


const NOW_YEAR = new Date().getFullYear();
Date.prototype.yyyymmdd = function () {
    var year = this.getFullYear();
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    var a = [
        ( mm > 9 ? '' : '0' ) + mm,
        ( dd > 9 ? '' : '0' ) + dd
    ];
    if ( NOW_YEAR != year ) {
        a = [ year ].concat( a );        
    }
    return a.join('-');
}
