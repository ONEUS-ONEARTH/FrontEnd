const clientHostName = window.location.hostname;
console.log('client : ', clientHostName);

const LOCAL_PORT = '8080';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const LOCATION_URL = 'http://localhost:3000';

// const S3URL = '..';
// const DEPLOY_BACKEND = "http://13.209.200.203";
//
// let backendHost;
//
// if (clientHostName === "localhost") {
//     backendHost = API_BASE_URL;
// } else if (clientHostName === S3URL) {
//     backendHost = DEPLOY_BACKEND;
// }

const USER = '/api/user';
const SIGN_UP = '/api/user';

export const USER_URL = API_BASE_URL + USER;
