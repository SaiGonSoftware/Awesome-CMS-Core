import "../../../../css/Admin/admin.scss";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./script";

import * as signalR from '@aspnet/signalr';
 
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/cmscore")
    .build();