const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/applicant/:address","/applicant/show")
  .add("/verifier/:address","/verifier/show")
  .add("/certverifier/:address","/certverifier/show")
  .add("/applicant/:address/documents","/applicant/documents/index")
  .add("/applicant/:address/documents/new","/applicant/documents/new")
  .add("/applicant/:address/certificate","/applicant/certificate/index")
  .add("/applicant/:address/certificate/new","/applicant/certificate/new")
  .add("/applicant/:address/assesment","/applicant/assesment/index")
  .add("/applicant/:address/assesment/webdevbasics","/applicant/assesment/webdevbasics/index")
  .add("/verifier/:address/verify","verifier/verify/index")
  .add("/certverifier/:address/verify","certverifier/verify/index")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
