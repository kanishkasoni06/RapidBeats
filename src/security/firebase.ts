// import Keycloak from "keycloak-js";

// const keycloakInstance = new Keycloak();

// /**
//  * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
//  *
//  * @param {Function} onAuthenticatedCallback - The callback function to be called if authentication is successful.
//  */
// const Login = (onAuthenticatedCallback: Function) => {
//   keycloakInstance
//     .init({ onLoad: "login-required" })
//     .then((authenticated: boolean) => {
//       authenticated ? onAuthenticatedCallback() : alert("non authenticated");
//     })
//     .catch((e: Error) => {
//       console.dir(e);
//       console.log(`keycloak init exception: ${e}`);
//     });
// };

// const UserName = () => keycloakInstance.tokenParsed?.preffered_username;

// const Logout = keycloakInstance.logout;

// const KeyCloakService = {
//   CallLogin: Login,
//   GetUserName: UserName,
//   CallLogout: Logout
// };

// export default KeyCloakService;
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// t to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the authentication and firestore instances
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const database = firebase.database();

export default firebase;
