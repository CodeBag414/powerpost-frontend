import axios from 'axios';
export const API_URL = 'https://dev2.powerpost.digital';
import cookie from 'react-cookie';

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
        console.log('in login');
        const data = {
            payload: {
                email: email,
                password: password
            }
        };
        const url = API_URL + '/user_api/login'; 
        // post request
        return axios.post(url, data)
            .then(response => {
                cookie.save('token', response.data.api_key);
                
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
         
     },
     /**
      * Get User
      */
     getCurrentUser() {
         const headers = { headers: {'X-API-KEY': cookie.load('token') }};
         return axios.get(API_URL + '/user_api/roles', headers)
            .then(response => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
     },
     /**
      * Logs the user out
      */
     logout() {

          const headers = { headers:{'X-API-KEY': cookie.load('token') }};
          
          return axios.get(API_URL + '/user_api/logout', headers)
            .then(response => {
                cookie.remove('token');
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
         return !!cookie.load('token');
     },
     
     /**
      * Registers a user then logs them in
      * 
      */
     register(name, email, password) {
        const data = {
            payload: {
                display_name: name,
                password: password,
                email: email
            }
        }
        
        const url = API_URL + '/account_api/create';
        return axios.post(url, data)
            .then(response => {
                console.log('response:' + response);
                auth.login(email, password);
            })
            .catch((error) => {
                console.log(error.response);
            });
         
     }
};

export default auth;