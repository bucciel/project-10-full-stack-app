import config from './config';

/* methods to create, sign-up, and authenticate the user */
export default class Data {
    /* GET and POST requests to REST API */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {    // parameters initialized with default values in case no values or undefined gets passed
        const url = config.apiBaseUrl + path;     // configures request path using the base URL defined in config.js

        const options = {     // sends a request with the HTTP method as well as the request headers and a stringified body
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {       // check if authorization is required
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);   // encode the user credentials with btoa() method which creates a base-64 encoded ASCII string from a "string" of data
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;   // set the HTTP Authorization request header to the Basic Authentication type
        }
        return fetch(url, options);
    }

    /* GET request to the /users endpoint and returns a JSON object containing user credentials */
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });   // calls api() method to return authenticated user
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /* POST request sending new user data to the /users endpoint */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
}
