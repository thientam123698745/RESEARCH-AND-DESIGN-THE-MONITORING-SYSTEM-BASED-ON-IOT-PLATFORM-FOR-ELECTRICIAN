// import * as firebase from 'firebase-admin';
// import * as serviceAccount from './serviceAccountKey.json';

// const firebase_params = {
//     type: serviceAccount.type,
//     projectId: serviceAccount.project_id,
//     privateKeyId: serviceAccount.private_key_id,
//     privateKey: serviceAccount.private_key,
//     clientEmail: serviceAccount.client_email,
//     clientId: serviceAccount.client_id,
//     authUri: serviceAccount.auth_uri,
//     tokenUri: serviceAccount.token_uri,
//     authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
//     clientC509CertUrl: serviceAccount.client_x509_cert_url
// }

// const defaultApp = firebase.initializeApp({
//     credential: firebase.credential.cert(firebase_params),
//     databaseURL: "https://fir-auth-bd895.firebaseio.com"
// });

// export {
//     defaultApp
// }

// import admin from 'firebase-admin';

// const serviceAccount = JSON.parse('./thesis0-a252e-firebase-adminsdk-zrd2a-8d7c883bb9.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'thesis0-a252e.appspot.com', // Replace with your Firebase Storage bucket URL
// });

// export const storage = admin.storage();

// module.exports = storage;


