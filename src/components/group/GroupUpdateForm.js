import React from "react";
import { createRefetchContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Form, Col } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import uuidv4 from "uuid/v4";
import EditField from "../EditField";
import InfoCreatorModifier from "../InfoCreatorModifier";
import FieldInput from "../FieldInput";
import { arrayPush, FieldArray, Field, reduxForm } from "redux-form";

import Worklog from "../Worklog";
import FieldArrayMembersGroup from "./FieldArrayMembersGroup";
import ToggleSection, { ToggleHeading, TogglePanel } from "../../components/ToggleSection";
import BackCTA from "../common/BackCTA";

import UpdateGroupMutation from "../../mutations/group/UpdateGroupMutation";

import "../../style/ModelDetails.scss";

class GroupUpdateForm extends React.Component {
    state = {
        editMode: false
    };
    refetch = () => {
        this.props.relay.refetch(
            { groupId: this.props.group.id }, // Our refetchQuery needs to know the `groupID`
            null, // We can use the refetchVariables as renderVariables
            () => {
                console.log("Refetch done");
            },
            { force: true }
        );
    };

    _hasBeenAdded = (newMember) => {
        if (this.props.memberValues) {
            return this.props.memberValues.some((member) => member.id === newMember.id);
        }
        return false;
    };

    handleSelectedMember = (selection) => {
        if (selection !== null) {
            this.props.getContact(selection.id).then((member) => {
                const newMember = {
                    name: member.name,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    id: member.id,
                    contact_type: member.contact_type,
                    organization: member.roles,
                    organization_obj: member.roles.length ? member.roles.map((elem) => elem.end) : [],
                    organization_label: member.roles.length ? member.roles.map((elem) => elem.end) : [],
                    email: member.emails,
                    email_obj: member.emails,
                    phone: member.phones,
                    phone_obj: member.phones,
                    created: true,
                    origin: "new",
                    status: "saved",
                    key: uuidv4()
                };
                if (!this._hasBeenAdded(newMember)) {
                    this.props.dispatch(arrayPush(this.props.form, "members", newMember));
                }
            });
        }
    };

    handleSubmit = (group) => {
        this.setState({ editMode: !this.state.editMode });
        UpdateGroupMutation(group, this);
    };

    renderHeaderName(editMode = true) {
        const { t, name } = this.props;
        return (
            <div className="title-section">
                <BackCTA onClick={() => this.props.history.goBack()} />
                <div className="vertical-separator"></div>
                <EditField
                    error={this.props.formSyncErrors.name}
                    meta={this.props.fields.name}
                    form={this.props.form}
                    dispatch={this.props.dispatch}
                    editable={editMode}
                    placeholder={t("contact-details.new")}
                >
                    <h1>{name}</h1>
                </EditField>
            </div>
        );
    }
    renderHeaderRight() {
        const { t, group } = this.props;
        return (
            <div className="title-section__right-block">
                <div className="title-section__right-block__buttons with-vertical-separator with-vertical-separator--right">
                    <button
                        type="button"
                        onClick={() => {
                            this.setState({ editMode: !this.state.editMode });
                        }}
                        className="btn outline btn-edit"
                    >
                        <i className="icon-pencil"></i>
                        <span>{t("actions.edit")}</span>
                    </button>
                </div>
                <InfoCreatorModifier model={group} />
            </div>
        );
    }

    renderDescriptionToggleSection(editMode = true) {
        const { t, description } = this.props;
        return (
            <ToggleSection>
                <ToggleHeading>
                    <h2>{t("organization-details.description")}</h2>
                </ToggleHeading>
                <TogglePanel>
                    {editMode ? (
                        <Field
                            name="description"
                            component={FieldInput}
                            as="textarea"
                            rows="3"
                            placeholder={t("group-details.add-description")}
                        ></Field>
                    ) : (
                        <span className="pre-text">{description}</span>
                    )}
                </TogglePanel>
            </ToggleSection>
        );
    }

    renderContactsToggleSection(editMode = true) {
        const { t } = this.props;
        return (
            <ToggleSection>
                <ToggleHeading>
                    <h2>{t("organization-details.contacts")}</h2>
                </ToggleHeading>

                <TogglePanel>
                    <FieldArray
                        name="members"
                        component={FieldArrayMembersGroup}
                        editable={editMode}
                        dispatch={this.props.dispatch}
                        errors={this.props.formSyncErrors.members}
                        metaFields={this.props.fields}
                        handleContactSearch={this.handleSelectedMember}
                        handleAddContactRow={() => {
                            this.props.dispatch(this.props.showNewContactForm());
                        }}
                    />
                </TogglePanel>
            </ToggleSection>
        );
    }

    renderSaveCancelCTAs() {
        const { t, pristine, submitting } = this.props;
        return (
            <div className="text-right mt-4">
                <button type="button" className="btn link" onClick={this.props.onDelete}>
                    {t("actions.delete")}
                </button>
                <button type="submit" className="btn primary lg" disabled={pristine || submitting}>
                    {t("actions.save")}
                </button>
            </div>
        );
    }

    render() {
        let { group, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                {this.renderSaveCancelCTAs()}
                <Form.Row>
                    <Col>{this.renderHeaderName(this.state.editMode)}</Col>
                    <Col>{this.renderHeaderRight()}</Col>
                </Form.Row>
                <section className="model-section">
                    <Form.Row>
                        <Col>{this.renderDescriptionToggleSection(this.state.editMode)}</Col>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                        <Col>{this.renderContactsToggleSection(this.state.editMode)}</Col>
                    </Form.Row>
                    <section className="model-section">
                        <Worklog model={group} refetch={this.refetch} />
                    </section>
                </section>
                {this.renderSaveCancelCTAs()}
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "* Required!";
    }

    if (values.members) {
        const memberArrayErrors = [];
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.name) {
                memberErrors.name = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            } else if (!/^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1}/i.test(member.name)) {
                memberErrors.name = "* Invalid name!";
                memberArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.email) {
                memberErrors.email = "* Required!";
                memberArrayErrors[memberIndex] = memberErrors;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(member.email)) {
                memberErrors.email = "* Invalid email!";
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
    return errors;
};

GroupUpdateForm = reduxForm({
    form: "updateGroup",
    validate,
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch, props) => {
        document.documentElement.scrollTop = 0;
    }
})(GroupUpdateForm);

const GroupUpdateFragment = createRefetchContainer(
    withTranslation()(GroupUpdateForm),
    {
        group: graphql`
            fragment GroupUpdateForm_group on Group {
                id
                name
                description
                contacts {
                    id
                    first_name
                    last_name
                    contact_type
                    emails {
                        id
                        name
                        type
                    }
                    phones {
                        id
                        name
                        type
                    }
                    roles {
                        role_data {
                            id
                            name
                        }
                        end {
                            id
                            name
                        }
                    }
                    outgoing {
                        name
                        relation {
                            relation_id
                            type
                            end {
                                id
                                node_name
                            }
                        }
                    }
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
                created
                creator {
                    email
                }
                modified
                modifier {
                    email
                }
            }
        `
    },

    graphql`
        # Refetch query to be fetched upon calling 'refetch'.
        # Notice that we re-use our fragment and the shape of this query matches our fragment spec.
        query GroupUpdateFormRefetchQuery($groupId: ID!) {
            getGroupById(id: $groupId) {
                ...GroupUpdateForm_group
            }
        }
    `
);

export default GroupUpdateFragment;
