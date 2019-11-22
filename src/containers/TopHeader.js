import { connect } from "react-redux";

import TopHeader from "../components/TopHeader";

const mapStateToProps = (state, props) => {
    return {
        view_community: state.app.user.view_community,
        view_services: state.app.user.view_services,
        view_network: state.app.user.view_network,
        landing_page: state.app.user.landing_page
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

const TopHeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopHeader);

export default TopHeaderContainer;
