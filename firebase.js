// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import firebase from "firebase/compat/app";
import { getMessaging, getToken } from "firebase/messaging";
import {useFcmStore} from "./src/store/fcm-token/fcm.ts";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FCM_KEY,
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase

const firebaseCloudMessaging = {
    init: async () => {

        let appFCM = null;
        if (!firebase.apps.length) {
         appFCM = firebase.initializeApp(firebaseConfig);
        }

        try {
            const messaging = await getMessaging();

            const status = await Notification.requestPermission();
            if (status && status === "granted") {
                const fcm_token = await getToken(messaging, {
                    vapidKey:
                    import.meta.env.VITE_APP_VAPID_KEY,
                });

                if (fcm_token) {
                    const fcmStore = useFcmStore();
                    await fcmStore.handleStoreTokenFcm(fcm_token);
                    return fcm_token;
                }
            }

        } catch (error) {
            console.error(error);
            return null;
        }
        messaging.onMessage(function (payload) {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                icon: payload.notification.icon,
            };
            new Notification(title, options);
        });
    },
};
export { firebaseCloudMessaging };