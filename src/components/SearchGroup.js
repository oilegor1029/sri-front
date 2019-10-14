import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { withRouter } from "react-router-dom";

import renameKeys from "rename-keys";

import environment from "../createRelayEnvironment";
import { ITEMS_PER_PAGE } from "../constants";

import GroupDetails from "./group/GroupDetails";
import CreateGroup from "./group/CreateGroup";
import GroupListContainer from "../containers/GroupList";
import Filter from "./Filter";
import OrderBy from "./OrderBy";
import RangeDayPicker from "./RangeDayPicker";
// import { RouteNotFound } from "./NotFound";

const SearchGroupAllQuery = graphql`
    query SearchGroupAllQuery($count: Int!, $filter: GroupFilter, $orderBy: GroupOrderBy) {
        ...GroupList_groups @arguments(count: $count, filter: $filter, orderBy: $orderBy)
    }
`;

class SearchGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countList: ITEMS_PER_PAGE,
            filterValue: "",
            filterDateType: "created",
            filterDateFrom: undefined,
            filterDateTo: undefined,
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

    resetFilterDate = () => {
        this.setState({ filterDate: {}, filterDateFrom: "", filterDateTo: "" });
    };

    render() {
        return (
            <section>
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.url}/groups`}
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
                                    <Col className="text-right" sm={4}>
                                        <Filter changeFilter={this._handleOnChangeFilter} />
                                        <OrderBy changeOrderBy={this._handleOnChangeOrderBy} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <QueryRenderer
                                            environment={environment}
                                            query={SearchGroupAllQuery}
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
                                                        <GroupListContainer
                                                            groups={props}
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
                    <Route path={`${this.props.match.url}/groups/create`} component={CreateGroup} />
                    <Route path={`${this.props.match.url}/groups/:groupId`} component={GroupDetails} />
                </Switch>
            </section>
        );
    }
}

export default withRouter(SearchGroup);
