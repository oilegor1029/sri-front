import _OpticalLinkFormParentClass from './_OpticalLinkFormParentClass';
// Common imports
import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import CreateOpticalLinkMutation from '../../mutations/opticalLink/CreateOpticalLinkMutation';
import ValidationsOpticalLinkForm from './ValidationsOpticalLinkForm';
// const
import { CREATE_OPTICALLINK_FORM } from '../../utils/constants';
import { isBrowser } from 'react-device-detect';

class CreateOpticalLinkForm extends _OpticalLinkFormParentClass {
  IS_UPDATED_FORM = false;
  FORM_ID = CREATE_OPTICALLINK_FORM;
  ROUTE_LIST_DIRECTION = '/network/optical-links';
  state = {
    errors: [],
  };
  handleSubmit = (opticalLink) => {
    CreateOpticalLinkMutation(opticalLink, this);
  };
  render() {
    const { handleSubmit, isFromModal } = this.props;
    const editMode = true;
    const showBackButton = isBrowser && !isFromModal;
    const showSaveCancelInHeader = showBackButton;
    const formId = `${this.FORM_ID}${isFromModal ? 'InModal' : ''}`;
    return (
      <form id={formId} onSubmit={handleSubmit(this.handleSubmit)}>
        {showSaveCancelInHeader && this.renderSaveCancelButtons()}
        <div className="model-details create-contact-form">
          {this.renderHeader(editMode, showBackButton)}
          {this.renderSections(editMode)}
        </div>
        {this.renderSaveCancelButtons()}
      </form>
    );
  }
}

CreateOpticalLinkForm = reduxForm({
  validate: ValidationsOpticalLinkForm.validate,
  initialValues: {
    name: '',
  },
})(CreateOpticalLinkForm);

export default withTranslation()(withRouter(CreateOpticalLinkForm));
