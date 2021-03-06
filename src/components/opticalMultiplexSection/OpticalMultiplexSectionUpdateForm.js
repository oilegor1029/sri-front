import _OpticalMultiplexSectionFormParentClass from './_OpticalMultiplexSectionFormParentClass';
// Common imports
import React from 'react';
import { withTranslation } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import UpdateOpticalMultiplexSectionMutation from '../../mutations/opticalMultiplexSection/UpdateOpticalMultiplexSectionMutation';
import ValidationsOpticalMultiplexSectionForm from './ValidationsOpticalMultiplexSectionForm';
// const
import { UPDATE_OPTICALMULTIPLEXSECTION_FORM } from '../../utils/constants';
import { isBrowser } from 'react-device-detect';

class OpticalMultiplexSectionUpdateForm extends _OpticalMultiplexSectionFormParentClass {
  IS_UPDATED_FORM = true;
  FORM_ID = UPDATE_OPTICALMULTIPLEXSECTION_FORM;
  MODEL_NAME = 'opticalMultiplexSection';
  ROUTE_LIST_DIRECTION = '/network/optical-multiplex-sections';
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.isEditModeModal,
    };
  }
  refetch = () => {
    this.props.relay.refetch(
      { opticalMultiplexSectionId: this.props.opticalMultiplexSection.id }, // Our refetchQuery needs to know the `opticalMultiplexSectionID`
      null, // We can use the refetchVariables as renderVariables
      () => {
        this.updateBreadcrumbsData();
      },
      { force: true },
    );
  };
  handleSubmit = (opticalMultiplexSection) => {
    this.setState({ editMode: false });
    UpdateOpticalMultiplexSectionMutation(opticalMultiplexSection, this);
  };
  render() {
    let { handleSubmit } = this.props;
    const { editMode } = this.state;
    const showBackButton = isBrowser;
    return (
      <form id={this.FORM_ID} onSubmit={handleSubmit(this.handleSubmit)}>
        {isBrowser && this.renderSaveCancelButtons()}
        {this.renderHeader(editMode, showBackButton)}
        {this.renderSections(editMode)}
        {this.renderSaveCancelButtons()}
      </form>
    );
  }
}

OpticalMultiplexSectionUpdateForm = reduxForm({
  validate: ValidationsOpticalMultiplexSectionForm.validate,
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    document.documentElement.scrollTop = 0;
  },
})(OpticalMultiplexSectionUpdateForm);

const OpticalMultiplexSectionUpdateFragment = createRefetchContainer(
  withTranslation()(OpticalMultiplexSectionUpdateForm),
  {
    opticalMultiplexSection: graphql`
      fragment OpticalMultiplexSectionUpdateForm_opticalMultiplexSection on OpticalMultiplexSection {
        id
        name
        description
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
    `,
  },

  graphql`
    # Refetch query to be fetched upon calling 'refetch'.
    # Notice that we re-use our fragment and the shape of this query matches our fragment spec.
    query OpticalMultiplexSectionUpdateFormRefetchQuery($opticalMultiplexSectionId: ID!) {
      getOpticalMultiplexSectionById(id: $opticalMultiplexSectionId) {
        ...OpticalMultiplexSectionUpdateForm_opticalMultiplexSection
      }
    }
  `,
);

export default OpticalMultiplexSectionUpdateFragment;
