// require('!!file?name=asset/css/semantic.min.css!../lib/semantic/semantic.min.css');
console.log(__DEV__);
if ( !__DEV__ ) {
    require('./util/init');
}
import "entry.styl";
import './util/vue.init';