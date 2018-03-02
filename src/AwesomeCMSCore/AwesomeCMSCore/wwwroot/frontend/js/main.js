//lib stylesheet
import "../css/lib.scss";

//app stylesheet
import "../css/app.scss";

import "./App/Helper/envConfig";
import { isDevEnviroment } from "./App/Helper/envConfig";
import "./App/Account/LoginForm.jsx";

if (isDevEnviroment()) {
  module.hot.accept();
}
