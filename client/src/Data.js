import config from './config';

/* methods to create, sign-up, and authenticate the user */
export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {      // GET and POST requests to REST API
        const url = config.apiBaseUrl + path;           // configures request path using the base URL defined in config.js

        const options = {               // sends a request with the HTTP method as well as the request headers and a stringified body
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    /* GET request to the /users endpoint and returns a JSON object containing user credentials */
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
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
