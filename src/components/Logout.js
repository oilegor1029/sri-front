import React, { Component } from "react";
import { API_HOST, COOKIE_DOMAIN } from "../config.js";
import Cookies from "js-cookie";

import "../style/Splash.scss";

class Logout extends Component {
    logout = () => {
        Cookies.remove("JWT", { domain: COOKIE_DOMAIN });
        window.location.replace(API_HOST + "/logout");
    };

    render() {
        return <i className="icon-logout" onClick={this.logout} title="Logout"></i>;
    }
}

export default Logout;
