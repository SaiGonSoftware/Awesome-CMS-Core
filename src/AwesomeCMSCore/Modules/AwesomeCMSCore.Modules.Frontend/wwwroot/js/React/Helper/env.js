let env = {};

if (process.env.NODE_ENV === "production") {
  env = {
    baseUrl: "http://randomshit.com",
    authorizeUrl: "http://randomshit.com/connect/token"
  };
} else {
  env = {
    baseUrl: "http://localhost:5000/",
    authorizeUrl: "http://localhost:5000/connect/token"
  };
}
export default env;
