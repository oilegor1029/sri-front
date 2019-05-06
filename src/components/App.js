import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import "bootstrap/scss/bootstrap.scss";

import FetchingContext from "../components/FetchingContext";

import SplashContainer from "../containers/Splash";
import HeaderContainer from "../containers/Header";
import BaseContainer from "../containers/Base";
import FooterContainer from "../containers/Footer";
import NotifyContainer from "../containers/Notify";

import "../style/App.scss";

import { history } from "../store";

class App extends Component {
    render() {
        return (
            <FetchingContext.Provider value={this.props.is_fetching}>
                <div className="App">
                    <ConnectedRouter history={history}>
                        <SplashContainer />
                        <HeaderContainer />
                        <NotifyContainer />
                        <Route path="/" component={BaseContainer} />
                        <FooterContainer />
                    </ConnectedRouter>
                </div>
            </FetchingContext.Provider>
        );
    }
}

App.propTypes = {
    is_fetching: PropTypes.bool
};

export default withTranslation()(App);
