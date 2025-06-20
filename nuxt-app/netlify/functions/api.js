const serverlessExpress = require('@vendia/serverless-express');
const app = require('../../../express-app/src/app');

exports.handler = serverlessExpress({ app }); 