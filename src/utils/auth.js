import axios from 'axios';
export const API_URL = 'https://dev.powerpost.digital';

const localStorage = global.window.localStorage;

let auth = {
    /**
     * Logs a user in returning a promise with 'true' when done
     */
     login(email, password) {
        // if already logged in return promise
        if(auth.loggedIn()) {
            return Promise.resolve(true);
        }
        console.log('email: ' + email + ' password: ' + password);
        const data = {
            payload: {
                email: email,
                password: password
            }
        };
        console.log('data: ' + data);
        const url = API_URL + '/user_api/login'; 
        // post request
        return axios.post(url, data)
            .then(response => {
                console.log(response);
                localStorage.token = response.data.roles.user_own_account.api_key;
                // window.location.href= '/dashboard';
                return Promise.resolve(true);
            })
            .catch((error) => {
                console.log(error.response);
            });
         
     },
     
     /**
      * Logs the user out
      */
     logout() {
          const apiKey = localStorage.getItem('token');
          const headers = { headers:{'X-API-KEY': apiKey }};
          
          return axios.get(API_URL + '/user_api/logout', headers)
            .then(response => {
                localStorage.removeItem('token');
                return Promise.resolve(true);
            })
            .catch((error) => {
                console.log(error);
            });
     },
      
     /**
      *
      * Checks if user is logged in
      */
     loggedIn() {
         return !!localStorage.token;
     },
     
     /**
      * Registers a user then logs them in
      * 
      */
     register(email, password) {
          
     }
};

export default auth;