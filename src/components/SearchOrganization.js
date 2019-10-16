import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { withRouter } from "react-router-dom";

import renameKeys from "rename-keys";

import environment from "../createRelayEnvironment";
import { ITEMS_PER_PAGE } from "../constants";

import OrganizationDetails from "./organization/OrganizationDetails";
import CreateOrganization from "./organization/CreateOrganization";
import OrganizationListContainer from "../containers/organization/OrganizationList";
import Filter from "./Filter";
import OrderBy from "./OrderBy";
import RangeDayPicker from "./RangeDayPicker";
// import { RouteNotFound } from "./NotFound";

const SearchOrganizationAllQuery = graphql`
    query SearchOrganizationAllQuery($count: Int!, $filter: OrganizationFilter, $orderBy: OrganizationOrderBy) {
        ...OrganizationList_organizations @arguments(count: $count, filter: $filter, orderBy: $orderBy)
    }
`;

class SearchOrganization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countList: ITEMS_PER_PAGE,
            filterValue: "",
            filterDateType: "created",
            filterDateFrom: "",
            filterDateTo: "",
            filterDate: {},
            orderBy: "handle_id_DESC"
        };
    }

    _handleOnChangeCount = (count) => {
        this.setState({ countList: this.state.countList + count });
    };

    _handleOnChangeFilter = (event) => {
        this.setState({ filterValue: event.target.value });
    };

    _handleOnChangeOrderBy = (orderBy) => {
        this.setState({ orderBy: orderBy });
    };

    handleDateTo = (dateTo) => {
        this.setState({ filterDateTo: dateTo });
    };

    handleDateFrom = (dateFrom) => {
        this.setState({ filterDateFrom: dateFrom });
    };

    handleResetDate = (from, to) => {
        this.setState({ filterDateFrom: from, filterDateto: to, filterDate: {} });
    };

    changeFilterDateType = (event) => {
        this.setState({ filterDateType: event.target.value });
        let newfilterDate = renameKeys(this.state.filterDate, (key) => {
            return key.replace(this.state.filterDateType, event.target.value);
        });
        this.setState({ filterDate: { ...newfilterDate } });
    };

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        const filterDateType = this.state.filterDateType;
        if (nextState.filterDateFrom !== undefined && this.state.filterDateFrom !== nextState.filterDateFrom) {
            this.setState({
                filterDate: { ...this.state.filterDate, [filterDateType + "_gte"]: nextState.filterDateFrom }
            });
        }
        if (nextState.filterDateTo !== undefined && this.state.filterDateTo !== nextState.filterDateTo) {
            this.setState({
                filterDate: { ...this.state.filterDate, [filterDateType + "_lte"]: nextState.filterDateTo }
            });
        }
    }

    render() {
        return (
            <section>
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.url}/organizations`}
                        render={() => (
                            <>
                                <Row>
                                    <Col>
                                        <div className="pretty p-default p-round">
                                            <input
                                                type="radio"
                                                name="filterDateType"
                                                checked={this.state.filterDateType === "created"}
                                                value="created"
                                                onChange={(e) => {
                                                    this.changeFilterDateType(e);
                                                }}
                                            />
                                            <div className="state p-info-o">
                                                <label>Created</label>
                                            </div>
                                        </div>

                                        <div className="pretty p-default p-round">
                                            <input
                                                type="radio"
                                                name="filterDateType"
                                                checked={this.state.filterDateType === "modified"}
                                                value="modified"
                                                onChange={(e) => {
                                                    this.changeFilterDateType(e);
                                                }}
                                            />
                                            <div className="state p-info-o">
                                                <label>Updated</label>
                                            </div>
                                        </div>
                                        <RangeDayPicker
                                            dateTo={this.handleDateTo}
                                            dateFrom={this.handleDateFrom}
                                            resetDate={this.handleResetDate}
                                        />
                                    </Col>
                                    <Col className="text-right">
                                        <Filter changeFilter={this._handleOnChangeFilter} />
                                        <OrderBy changeOrderBy={this._handleOnChangeOrderBy} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <QueryRenderer
                                            environment={environment}
                                            query={SearchOrganizationAllQuery}
                                            variables={{
                                                count: ITEMS_PER_PAGE,
                                                orderBy: this.state.orderBy,
                                                filter: {
                                                    AND: [
                                                        this.state.filterDate,
                                                        { name_contains: this.state.filterValue }
                                                    ]
                                                }
                                            }}
                                            render={({ error, props }) => {
                                                if (error) {
                                                    return <div>{error.message}</div>;
                                                } else if (props) {
                                                    return (
                                                        <OrganizationListContainer
                                                            organizations={props}
                                                            changeCount={this._handleOnChangeCount}
                                                        />
                                                    );
                                                }
                                                return <div>Loading</div>;
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </>
                        )}
                    />
                    <Route path={`${this.props.match.url}/organizations/create`} component={CreateOrganization} />
                    <Route
                        path={`${this.props.match.url}/organizations/:organizationId`}
                        component={OrganizationDetails}
                    />
                </Switch>
            </section>
        );
    }
}

export default withRouter(SearchOrganization);