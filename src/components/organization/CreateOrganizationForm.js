import React from "react";
import { Form, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { arrayPush, FieldArray, Field, reduxForm } from "redux-form";
import uuidv4 from "uuid/v4";

import DropdownSearch from "../DropdownSearch";
import FieldArrayContactOrganization from "./FieldArrayContactOrganization";
import FieldArrayAddressOrganization from "./FieldArrayAddressOrganization";
import ToggleSection, { ToggleHeading, TogglePanel } from "../../components/ToggleSection";
import Dropdown from "../Dropdown";
import EditField from "../EditField";
import FieldInput from "../FieldInput";
import FiledArrayCheckbox, { INPUTS } from "../FieldArrayCheckbox";

class CreateOrganizationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    _hasBeenAdded = (newContact) => {
        return this.props.contactsValues.some((contact) => contact.handle_id === newContact.handle_id);
    };

    handleSelectedContact = (selection) => {
        if (selection !== null) {
            this.props.getContact(selection.handle_id).then((contact) => {
                const newContact = {
                    name: contact.name,
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                    handle_id: contact.handle_id,
                    contact_type: contact.contact_type,
                    role: contact.roles[0] ? contact.roles[0].role_data.handle_id : "",
                    role_obj: contact.roles[0],
                    role_label: contact.roles[0] ? contact.roles[0].role_data.name : "",
                    email: contact.emails[0] ? contact.emails[0].name : "",
                    email_obj: contact.emails[0] ? contact.emails[0] : {},
                    phone: contact.phones[0] ? contact.phones[0].name : "",
                    phone_obj: contact.phones[0] ? contact.phones[0] : {},
                    created: true,
                    origin: "new",
                    status: "saved",
                    key: uuidv4()
                };
                if (!this._hasBeenAdded(newContact)) {
                    this.props.dispatch(arrayPush(this.props.form, "contacts", newContact));
                }
            });
        }
    };

    render() {
        const { handleSubmit, t, name } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="model-details">
                    <section className="title-section">
                        <EditField
                            error={this.props.formSyncErrors.name}
                            meta={this.props.fields.name}
                            initialValue="New organization"
                            form={this.props.form}
                            dispatch={this.props.dispatch}
                            value={name}
                        >
                            <h1 className="ml-0">{name}</h1>
                        </EditField>
                    </section>
                    <section className="model-section">
                        <Form.Row>
                            <Col>
                                <ToggleSection defaultEditable={false}>
                                    <ToggleHeading>
                                        <h2>{t("organization-details.description")}</h2>
                                    </ToggleHeading>
                                    <TogglePanel>
                                        <Field
                                            name="description"
                                            component={FieldInput}
                                            as="textarea"
                                            rows="3"
                                            placeholder={t("group-details.add-description")}
                                        />
                                    </TogglePanel>
                                </ToggleSection>
                            </Col>
                        </Form.Row>
                        <hr />
                        <Form.Row>
                            <Col>
                                <ToggleSection defaultEditable={false}>
                                    <ToggleHeading>
                                        <h2>{t("organization-details.general-information")}</h2>
                                    </ToggleHeading>
                                    <TogglePanel>
                                        <div className="table-details">
                                            <div>
                                                <div>Type</div>
                                                <div>Affiliation</div>
                                                <div>Parent Organization ID</div>
                                            </div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <Dropdown
                                                            className="auto"
                                                            emptyLabel="Select type"
                                                            type="organization_types"
                                                            name="type"
                                                            onChange={(e) => {}}
                                                        />
                                                    </div>
                                                    <div>
                                                        <FiledArrayCheckbox
                                                            data={INPUTS}
                                                            form={this.props.form}
                                                            dispatch={this.props.dispatch}
                                                            editable={true}
                                                            initialValues={this.props.initialValues.affiliation}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Form.Group>
                                                            <Field
                                                                type="text"
                                                                name="relationship_parent_of"
                                                                component={FieldInput}
                                                                placeholder={t("contact-details.add-notes")}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TogglePanel>
                                </ToggleSection>
                            </Col>
                        </Form.Row>
                        <hr />
                        <Form.Row>
                            <Col>
                                <ToggleSection defaultEditable={false}>
                                    <ToggleHeading>
                                        <h2>{t("organization-details.address")}</h2>
                                    </ToggleHeading>
                                    <TogglePanel>
                                        <div className="table-details">
                                            <div>
                                                <div>Website</div>
                                                <div>Street</div>
                                                <div>Postal Code</div>
                                                <div>Postal Area</div>
                                                <div>Phone</div>
                                            </div>
                                            <div>
                                                <FieldArray
                                                    name="addresses"
                                                    component={FieldArrayAddressOrganization}
                                                    editable={true}
                                                    dispatch={this.props.dispatch}
                                                    errors={this.props.formSyncErrors.addresses}
                                                    metaFields={this.props.fields}
                                                />
                                            </div>
                                        </div>
                                    </TogglePanel>
                                </ToggleSection>
                            </Col>
                        </Form.Row>
                        <hr />
                        <Form.Row>
                            <Col>
                                <ToggleSection defaultEditable={false}>
                                    <ToggleHeading>
                                        <h2>{t("organization-details.contacts")}</h2>
                                        <DropdownSearch selection={this.handleSelectedContact} />
                                    </ToggleHeading>
                                    <TogglePanel>
                                        <div className="table-details">
                                            <div>
                                                <div>Name</div>
                                                <div>Role</div>
                                                <div>Email</div>
                                                <div>Phone</div>
                                                <div></div>
                                            </div>
                                            <div>
                                                <FieldArray
                                                    name="contacts"
                                                    component={FieldArrayContactOrganization}
                                                    editable={true}
                                                    dispatch={this.props.dispatch}
                                                    errors={this.props.formSyncErrors.members}
                                                    metaFields={this.props.fields}
                                                />
                                            </div>
                                        </div>
                                    </TogglePanel>
                                </ToggleSection>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className="model-section">
                        <ToggleSection defaultEditable={false}>
                            <ToggleHeading>
                                <h2>{t("organization-details.additional-info")}</h2>
                            </ToggleHeading>
                            <TogglePanel>
                                <Field
                                    name="incident_management_info"
                                    component={FieldInput}
                                    as="textarea"
                                    rows="3"
                                    placeholder={t("organization-details.add-description")}
                                    onBlur={(e) => {
                                        this.setState({ incident_management_info: e.target.value });
                                    }}
                                />
                            </TogglePanel>
                        </ToggleSection>
                    </section>
                    <section className="model-section">
                        <ToggleSection defaultEditable={false}>
                            <ToggleHeading>
                                <h2>{t("contact-details.worklog")}</h2>
                            </ToggleHeading>
                            <TogglePanel>
                                <Field
                                    name="comment"
                                    component={FieldInput}
                                    as="textarea"
                                    rows="3"
                                    placeholder={t("worklog.add-comment")}
                                    onBlur={(e) => {
                                        this.setState({ comment: e.target.value });
                                    }}
                                />
                            </TogglePanel>
                        </ToggleSection>
                    </section>
                </div>
                <div className="text-right mt-4">
                    <button
                        type="button"
                        className="mr-2 btn link"
                        onClick={() => {
                            this.props.history.push("/community/organizations");
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn primary lg"
                        type="submit"
                        // disabled={!this.props.valid || this.props.pristine || this.props.submitting}
                    >
                        Save
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

    if (!values.addresses || !values.addresses.length) {
        errors.addresses = { _error: "At least one address must be entered" };
    } else {
        const addressArrayErrors = [];
        values.addresses.forEach((address, addressIndex) => {
            const addressErrors = {};
            if (!address || !address.website) {
                addressErrors.website = "* Required!";
                addressArrayErrors[addressIndex] = addressErrors;
            }
            if (!address || !address.street) {
                addressErrors.street = "* Required!";
                addressArrayErrors[addressIndex] = addressErrors;
            }
            if (!address || !address.postal_code) {
                addressErrors.postal_code = "* Required!";
                addressArrayErrors[addressIndex] = addressErrors;
            }
            if (!address || !address.postal_area) {
                addressErrors.postal_area = "* Required!";
                addressArrayErrors[addressIndex] = addressErrors;
            }
            if (!address || !address.phone) {
                addressErrors.phone = "* Required!";
                addressArrayErrors[addressIndex] = addressErrors;
            }
            return addressErrors;
        });
        if (addressArrayErrors.length) {
            errors.addresses = addressArrayErrors;
        }
    }

    if (!values.contacts || !values.contacts.length) {
        errors.contacts = { _error: "At least one contact must be entered" };
    } else {
        const contactArrayErrors = [];
        values.contacts.forEach((contact, contactIndex) => {
            const contactErrors = {};
            if (!contact || !contact.name) {
                contactErrors.name = "* Required!";
                contactArrayErrors[contactIndex] = contactErrors;
            }
            if (!contact || !contact.role) {
                contactErrors.role = "* Required!";
                contactArrayErrors[contactIndex] = contactErrors;
            }
            if (!contact || !contact.email) {
                contactErrors.email = "* Required!";
                contactArrayErrors[contactIndex] = contactErrors;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contact.email)) {
                contactErrors.email = "* Invalid email!";
                contactArrayErrors[contactIndex] = contactErrors;
            }
            if (!contact || !contact.phone) {
                contactErrors.phone = "* Required!";
                contactArrayErrors[contactIndex] = contactErrors;
            }
            return contactErrors;
        });
        if (contactArrayErrors.length) {
            errors.contacts = contactArrayErrors;
        }
    }
    return errors;
};

CreateOrganizationForm = reduxForm({
    form: "createOrganization",
    validate,
    initialValues: {
        name: "New organization",
        contacts: [{ name: "", role: "", email: "", phone: "", key: uuidv4(), created: false, status: "editing" }],
        addresses: [
            {
                website: "",
                street: "",
                postal_code: "",
                postal_area: "",
                phone: "",
                key: uuidv4(),
                created: false,
                status: "editing"
            }
        ]
    }
})(CreateOrganizationForm);

export default withTranslation()(withRouter(CreateOrganizationForm));
