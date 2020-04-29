import {store} from 'react-notifications-component';


const alertCustom = (title, message, type, duration) =>{
    store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: duration ? duration :5000,
          onScreen: true
        }
      });
}


export default alertCustom;