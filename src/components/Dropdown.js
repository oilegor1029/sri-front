import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Field } from "redux-form";

import FieldSelect from "./FieldSelect";

import environment from "../createRelayEnvironment";

const DropdownQuery = graphql`
    query DropdownQuery($name: String!) {
        getChoicesForDropdown(name: $name) {
            name
            value
        }
    }
`;

const DropdownOrganizationsAllQuery = graphql`
    query DropdownOrganizationsAllQuery {
        all_organizations {
            handle_id
            node_name
        }
    }
`;

const DropdownRolesQuery = graphql`
    query DropdownRolesQuery {
        roles {
            edges {
                node {
                    handle_id
                    name
                }
            }
        }
    }
`;

class Dropdown extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        model: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string,
        emptyLabel: PropTypes.string,
        defaultValue: PropTypes.string
    };

    renderOptions = (options) => {
        return options.map((option) => {
            return (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            );
        });
    };

    renderOptionsModel = (options) => {
        return options.edges.map((option) => {
            return (
                <option key={option.node.handle_id} value={option.node.handle_id}>
                    {option.node.name}
                </option>
            );
        });
    };

    renderOptionsModelOptimized = (options) => {
        return options.map((option) => {
            return (
                <option key={option.handle_id} value={option.handle_id}>
                    {option.node_name}
                </option>
            );
        });
    };

    render() {
        let dropdownQuery = undefined;
        switch (this.props.model) {
            case "organization":
                dropdownQuery = DropdownOrganizationsAllQuery;
                break;
            case "roles":
                dropdownQuery = DropdownRolesQuery;
                break;
            default:
                dropdownQuery = DropdownQuery;
                break;
        }
        const variables =
            this.props.model === undefined
                ? {
                      name: this.props.type
                  }
                : null;
        return (
            <Form.Group className="d-inline">
                {this.props.label && <Form.Label>{this.props.label}</Form.Label>}
                <QueryRenderer
                    environment={environment}
                    query={dropdownQuery}
                    variables={variables}
                    render={({ error, props }) => {
                        if (error) {
                            return <div>{error.message}</div>;
                        } else if (props) {
                            let options = undefined;
                            if (this.props.model !== undefined) {
                                options = props[Object.keys(props)[0]];
                            } else {
                                options = props.getChoicesForDropdown;
                            }

                            return (
                                <Field
                                    className={this.props.className}
                                    component={FieldSelect}
                                    onChange={(e) => this.props.onChange(e)}
                                    name={this.props.name}
                                    value={this.props.defaultValue || ""}
                                >
                                    {this.props.emptyLabel && (
                                        <option value="" disabled hidden default>
                                            {this.props.emptyLabel}
                                        </option>
                                    )}
                                    {this.props.model === "organization" && this.renderOptionsModelOptimized(options)}
                                    {this.props.model === "roles" && this.renderOptionsModel(options)}
                                    {this.props.model === undefined && this.renderOptions(options)}
                                </Field>
                            );
                        }
                        return (
                            <div>
                                <select className={this.props.className}>
                                    <option value="default">{this.props.emptyLabel}</option>
                                </select>
                            </div>
                        );
                    }}
                />
            </Form.Group>
        );
    }
}

export default Dropdown;
