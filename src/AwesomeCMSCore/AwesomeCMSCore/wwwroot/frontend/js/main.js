import "bootstrap/scss/bootstrap.scss";
import "../css/style.scss";
import "toastr/toastr.scss";
import "./App/Helper/envConfig";
import { isDevEnviroment } from "./App/Helper/envConfig";
import "./App/Account/LoginForm.jsx";

if (isDevEnviroment()) {
  module.hot.accept();
}
