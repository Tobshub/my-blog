// get the node env

// is production boolean from vite
const { PROD } = import.meta.env;

export default {
  // the url for the backend service
  // also consumed by trpc
  // set to localhost if not prouction
  SERVER_URL: PROD
    ? "https://my-blog-api-4j8x.onrender.com" /* hosted api url */
    : "http://localhost:8080",
};
