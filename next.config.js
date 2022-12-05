require("dotenv").config();

module.exports = {
  env: {
    API_URL: process.env.API_URL, // on client we dont have access to thiis
  },
  publicRuntimeConfig: {
    // to run on server and on client side
    API_URL: process.env.API_URL,
    // IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_URL: process.env.API_URL, // Pass through env variables
  },
};
