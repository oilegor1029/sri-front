import React from "react";
import PropTypes from "prop-types";
import { createPaginationContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Button, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../constants";
import ContactRow from "./ContactRow";

class ContactList extends React.PureComponent {
    static propTypes = {
        contacts: PropTypes.object.isRequired
    };

    _loadMore = () => {
        if (!this.props.relay.hasMore()) {
            console.log(`Nothing more to load`);
            return;
        } else if (this.props.relay.isLoading()) {
            console.log(`Request is already pending`);
            return;
        }

        this.props.relay.loadMore(ITEMS_PER_PAGE);
    };

    _handleOnClick = (event, data) => {
        this.props.history.push(`${this.props.match.url}/${data.handle_id}`);
    };

    getData() {
        let models = this.props.contacts.contacts;
        return models.edges.map(({ node }) => (
            <ContactRow
                Key={node.handle_id}
                contact={node}
                onClick={this._handleOnClick}
            />
        ));
    }

    renderTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Contact Type</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>{this.getData()}</tbody>
            </Table>
        );
    }
    render() {
        return (
            <section>
                {this.renderTable()}
                <Button
                    onClick={() => this._loadMore()}
                    variant="outline-primary"
                >
                    Load More
                </Button>
            </section>
        );
    }
}

export default createPaginationContainer(
    withRouter(ContactList),
    graphql`
        fragment ContactList_contacts on Query
            @argumentDefinitions(
                count: { type: "Int" }
                cursor: { type: "String" }
                filter: { type: ContactFilter }
            ) {
            contacts(first: $count, after: $cursor, filter: $filter)
                @connection(key: "ContactList_contacts", filters: []) {
                edges {
                    node {
                        handle_id
                        ...ContactRow_contact
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    `,
    {
        direction: "forward",
        query: graphql`
            # Pagination query to be fetched upon calling 'loadMore'.
            # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
            query ContactListForwardQuery($count: Int!, $cursor: String) {
                ...ContactList_contacts
                    @arguments(count: $count, cursor: $cursor)
            }
        `,
        getConnectionFromProps(props) {
            return props.contacts && props.contacts.contacts;
        },
        // This is also the default implementation of `getFragmentVariables` if it isn't provided.
        getFragmentVariables(previousVariables, totalCount) {
            return {
                ...previousVariables,
                count: totalCount
            };
        },
        getVariables(props, paginationInfo, fragmentVariables) {
            return {
                count: paginationInfo.count,
                cursor: paginationInfo.cursor
            };
        }
    }
);
