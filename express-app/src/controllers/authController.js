const db = require('../db/knex');
const AuthStackService = require('../service/authStack');  // Import the AuthStackService

const createUser = async (req, res) => {
    const body = req.body
    body.verification_callback_url = 'https://example.com/handler/email-verification'
    const response = await AuthStackService.post('/auth/password/sign-up', body);
    res.json(response);
};

const signIn = async (req,res) => {
    const body = req.body;
    const response = await AuthStackService.post('/auth/password/sign-in', body);
    res.json(response)
}

const sendResetPasswordCode = async (req,res) => {
    const body = req.body
    body.callback_url = 'https://example.com/handler/reset-password-code'
    const response = await AuthStackService.post('/auth/password/send-reset-code', body);
    res.json(response);
}

const getCurrentUser = async (req, res) => {
    const access_token = req.headers['x-stack-access-token'];
    const response = await AuthStackService.get('/users/me', {
            'X-Stack-Access-Token' : access_token
        }
    );
    res.json(response);
}

const authCurrentUser = async (req) =>{
    const access_token = req.headers['x-stack-access-token'];
    const response = await AuthStackService.get('/users/me', {
            'X-Stack-Access-Token' : access_token
        }
    );
    return response
}

const refreshAccessToken = async (req,res) => {
    const refresh_token = req.headers['x-stack-refresh-token'];
    const response = await AuthStackService.post('/auth/sessions/current/refresh', {} , {
        'X-Stack-Refresh-Token' : refresh_token
        }
    );
    res.json(response);

}

const signOut = async (req,res) => {
    const access_token = req.headers['x-stack-access-token'];
    const response = await AuthStackService.delete('/auth/sessions/current', {
        'X-Stack-Access-Token' : access_token,
        }
    );
    res.json(response);
    
}

module.exports = { createUser, signIn, sendResetPasswordCode, getCurrentUser, refreshAccessToken, signOut, authCurrentUser};