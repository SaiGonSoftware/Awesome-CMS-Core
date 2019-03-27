import "../../../../css/Admin/admin.scss";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./script";

import * as signalR from '@aspnet/signalr';
 
// eslint-disable-next-line no-unused-vars
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/cmscore")
    .build();