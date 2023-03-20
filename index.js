const protect = require('static-auth');
const safeCompare = require('safe-compare');

const authUser = process.env.AUTHUSER;
const authPass = process.env.AUTHPASS;

const app = protect(
  '/',
  (username, password) => safeCompare(username, authUser) && safeCompare(password, authPass),
  {
    directory: __dirname + '/_static',
    realm: 'vercel-basic-auth.node-static-auth',
    onAuthFailed: res => {
      res.end('Restricted area');
    }
  }
);

module.exports = app;