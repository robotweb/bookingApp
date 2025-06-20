const serverlessExpress = require('@vendia/serverless-express');
const app = require('./express-app/server');

exports.handler = serverlessExpress({ app }); 