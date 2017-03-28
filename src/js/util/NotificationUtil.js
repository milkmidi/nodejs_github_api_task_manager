var Notification = require( 'component/Notification.vue' );
const NotificationComponent = Vue.extend(Notification);
const openNotification = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 4500,
    container: '.notifications'
}) => {
        
    return new NotificationComponent( {
        el: document.createElement( 'div' ),
        propsData
    });
}
export default openNotification;