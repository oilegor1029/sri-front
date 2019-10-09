import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
// import OutsideClick from "../components/OutsideCLick";
import { Field } from "redux-form";

import FieldInput from "./FieldInput";

import "../style/EditField.scss";

class EditField extends React.Component {
    constructor() {
        super();

        this.state = {
            editable: false
        };
    }

    static propTypes = {
        children: PropTypes.element.isRequired
    };

    editField = (event) => {
        console.log(this.props.meta, this.props.error, this.state);
        if ((this.props.error && !this.state.editable) || this.props.error === undefined) {
            this.setState({ editable: !this.state.editable });
        }
    };

    editDone = (event) => {
        event.preventDefault();
        if (!this.props.error) {
            this.setState({ editable: false });
        }
    };

    render() {
        const { error, meta, reduxForm } = this.props;
        const has_error = meta && meta.touched && error;
        return reduxForm ? (
            <>
                <Form.Group className={`${!this.state.editable ? "d-none" : "d-inline"}`}>
                    <Field
                        className="edit-field-title auto"
                        placeholder="Name"
                        component={FieldInput}
                        name="name"
                        onBlur={(e) => this.editDone(e)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") this.editDone(e);
                        }}
                    />
                </Form.Group>
                <span className={`${this.state.editable ? "d-none" : "d-inline"} ${has_error ? "error-title" : ""}`}>
                    {this.props.children}
                </span>
                <FontAwesomeIcon icon={faPen} onClick={(e) => this.editField(e)} />
            </>
        ) : (
            <>
                {this.state.editable ? (
                    <Form.Group controlId="formGroupName" className="d-inline">
                        <Form.Control
                            className="edit-field-title auto"
                            placeholder="Full Name"
                            name="full-name"
                            defaultValue={this.props.children.props.children}
                            onBlur={(e) => this.editDone(e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") this.editDone(e);
                            }}
                        />
                    </Form.Group>
                ) : (
                    this.props.children
                )}

                <FontAwesomeIcon icon={faPen} onClick={(e) => this.editField(e)} />
            </>
        );
    }
}

export default EditField;
