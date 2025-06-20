// authMiddleware.js
const  { authCurrentUser } =  require('./controllers/authController.js');

async function protectRoute(req, res, next) {
    // Check if the user is authenticated (this can vary based on your auth system)
    req.user = await authCurrentUser(req);
    next();
}

module.exports = protectRoute;