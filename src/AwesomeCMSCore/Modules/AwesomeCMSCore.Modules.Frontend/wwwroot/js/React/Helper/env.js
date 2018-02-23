let env = {};

if (process.env.NODE_ENV === "production") {
  env = {
    baseUrl: "http://randomshit.com",
    tokenUrl: "http://randomshit.com/connect/token"
  };
} else {
  env = {
    baseUrl: "http://localhost:5000/",
    tokenUrl: "http://localhost:5000/connect/token",
    loginUrl: "http://localhost:5000/Account/Login"
  };
}
export default env;
