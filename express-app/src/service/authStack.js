const dotenv = require('dotenv');
dotenv.config();

class AuthStackService {
  constructor() {
    this.apiBaseUrl = process.env.AUTH_STACK_URL;
  }

  // Function to make authenticated requests with the fetch method
  async request(endpoint, method = 'GET', body = null, moreHeaders = null) {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Stack-Access-Type' : "client",
      'X-Stack-Project-Id' : process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
      'X-Stack-Publishable-Client-Key' : process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
      ...moreHeaders
    };

    const options = {
      method,
      headers,
    };

    //console.log(options)

    if (body) {
      options.body = JSON.stringify(body);  // Add body for POST/PUT requests
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // console.log(response)
        // throw new Error(`${response.statusText}`);
        const error = new Error(`${response.statusText}`);
        error.statusText = response.statusText;
        error.statusCode = response.status;
        throw error
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get(endpoint, headers = null) {
    return this.request(endpoint, 'GET', null, headers);
  }

  async post(endpoint, body, headers = null) {
    return this.request(endpoint, 'POST', body, headers);
  }

  async put(endpoint, body, headers = null) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  async delete(endpoint, headers = null) {
    return this.request(endpoint, 'DELETE', null, headers);
  }
}

module.exports = new AuthStackService();