export default class AuthService {
    
    constructor(domain) {
        this.domain = domain || 'http://localhost:3001' 
        this.fetch = this.fetch.bind(this)
        this.setToken = this.setToken.bind(this)
        
    }
    loggedIn() {
       
        const token = this.getToken() 
        return !!token 
    
    }
    setToken(idToken) {
        // Saves user token to localStorage
       // console.log("set token is called",idToken);
        localStorage.setItem('id_token', idToken)
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }
    
    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

}