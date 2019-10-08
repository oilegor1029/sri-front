import React from "react";
import { createRefetchContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Form, Col } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import uuidv4 from "uuid/v4";
import DropdownSearch from "../DropdownSearch";
import EditField from "../EditField";
import InfoCreatorModifier from "../InfoCreatorModifier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import FieldInput from "../FieldInput";
import { arrayPush, FieldArray, Field, reduxForm } from "redux-form";

import Worklog from "../Worklog";

import FieldArrayMembersGroup from "./FieldArrayMembersGroup";
import ToggleSection, { ToggleHeading, TogglePanel, PanelEditable } from "../../components/ToggleSection";

import "../../style/ModelDetails.scss";

const validateMembers = (values, allValues, props) => {
    let memberArrayErrors = {};
    if (values !== undefined) {
        values.forEach((member, memberIndex) => {
            let memberErrors = "";
            if (
                member.name === undefined ||
                member.organization === undefined ||
                member.email === undefined ||
                member.phone === undefined
            ) {
                memberErrors = "* Invalid Member!";
            }
            memberArrayErrors = memberErrors;
        });
    }
    return memberArrayErrors ? memberArrayErrors : undefined;
};

class GroupUpdateForm extends React.Component {
    refetch = () => {
        this.props.relay.refetch(
            { groupId: this.props.group.handle_id }, // Our refetchQuery needs to know the `groupID`
            null, // We can use the refetchVariables as renderVariables
            () => {
                console.log("Refetch done");
            },
            { force: true }
        );
    };

    handleSelectedMember = (selection) => {
        if (selection !== null) {
            const addMember = { ...selection.node };
            const newMember = {
                name: addMember.name,
                first_name: addMember.first_name,
                last_name: addMember.last_name,
                handle_id: addMember.handle_id,
                contact_type: addMember.contact_type,
                organization: addMember.roles[0].end.handle_id,
                organization_obj: addMember.roles[0].end,
                organization_label: addMember.roles[0].end.name,
                email: addMember.emails[0] ? addMember.emails[0].name : "",
                email_obj: addMember.emails[0] ? addMember.emails[0] : {},
                phone: addMember.phones[0] ? addMember.phones[0].name : "",
                phone_obj: addMember.phones[0] ? addMember.phones[0] : {},
                created: true,
                origin: "new",
                status: "saved",
                key: uuidv4()
            };

            this.props.dispatch(arrayPush("updateGroup", "members", newMember));
        }
    };

    render() {
        let { group, name, description, t, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col>
                        <div className="title-section">
                            <button
                                type="button"
                                onClick={() => this.props.history.push(`/community/groups`)}
                                className="btn btn-back outline"
                            >
                                <span>{t("actions.back")}</span>
                            </button>
                            <EditField error={this.props}>
                                <h1>{name}</h1>
                            </EditField>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </Col>
                    <Col>
                        <InfoCreatorModifier model={group} />
                    </Col>
                </Form.Row>
                <section className="model-section">
                    <Form.Row>
                        <Col>
                            <ToggleSection>
                                <ToggleHeading>
                                    <h2>{t("group-details.description")}</h2>
                                </ToggleHeading>
                                <TogglePanel>
                                    <PanelEditable.Consumer>
                                        {(editable) => {
                                            return editable ? (
                                                <Field
                                                    name="description"
                                                    component={FieldInput}
                                                    as="textarea"
                                                    rows="3"
                                                    placeholder={t("group-details.add-description")}
                                                />
                                            ) : (
                                                <span>{description}</span>
                                            );
                                        }}
                                    </PanelEditable.Consumer>
                                </TogglePanel>
                            </ToggleSection>
                        </Col>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                        <Col>
                            <ToggleSection>
                                <ToggleHeading>
                                    <h2>{t("group-details.members")}</h2>
                                    <PanelEditable.Consumer>
                                        {(editable) => {
                                            return editable && <DropdownSearch selection={this.handleSelectedMember} />;
                                        }}
                                    </PanelEditable.Consumer>
                                </ToggleHeading>
                                <TogglePanel>
                                    <PanelEditable.Consumer>
                                        {(editable) => {
                                            return (
                                                <div className="table-details">
                                                    <div>
                                                        <div>Name</div>
                                                        <div>Organization</div>
                                                        <div>Email</div>
                                                        <div>Phone</div>
                                                        <div></div>
                                                    </div>
                                                    <div>
                                                        <FieldArray
                                                            name="members"
                                                            component={FieldArrayMembersGroup}
                                                            editable={editable}
                                                            validate={validateMembers}
                                                            dispatch={this.props.dispatch}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </PanelEditable.Consumer>
                                </TogglePanel>
                            </ToggleSection>
                        </Col>
                    </Form.Row>
                </section>
                <section className="model-section">
                    <Worklog model={group} refetch={this.refetch} />
                </section>
                <div className="text-right mt-4">
                    <button type="button" className="btn link">
                        {t("actions.delete")}
                    </button>
                    <button type="submit" className="btn primary lg">
                        {t("actions.save")}
                    </button>
                </div>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "* Required!";
    }

    if (!values.members || !values.members.length) {
        errors.members = { _error: "At least one member must be entered" };
    } else {
        const memberArrayErrors = [];
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.name) {
                memberErrors.name = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.organization) {
                memberErrors.organization = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.email) {
                memberErrors.email = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.phone) {
                memberErrors.phone = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            }
            return memberErrors;
        });
        if (memberArrayErrors.length) {
            errors.members = memberArrayErrors;
        }
    }
    console.log(errors);
    return errors;
};

GroupUpdateForm = reduxForm({
    form: "updateGroup",
    validate
})(GroupUpdateForm);

const GroupUpdateFragment = createRefetchContainer(
    withTranslation()(GroupUpdateForm),
    {
        group: graphql`
            fragment GroupUpdateForm_group on Group {
                handle_id
                name
                description
                created
                creator {
                    email
                }
                modified
                modifier {
                    email
                }
                comments {
                    id
                    user {
                        first_name
                        last_name
                    }
                    comment
                    submit_date
                }
            }
        `
    },

    graphql`
        # Refetch query to be fetched upon calling 'refetch'.
        # Notice that we re-use our fragment and the shape of this query matches our fragment spec.
        query GroupUpdateFormRefetchQuery($groupId: Int!) {
            getGroupById(handle_id: $groupId) {
                ...GroupUpdateForm_group
            }
        }
    `
);

export default GroupUpdateFragment;
