import _RouterFormParentClass from './_RouterFormParentClass';
// Common imports
import React from 'react';
import { withTranslation } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import UpdateRouterMutation from '../../mutations/router/UpdateRouterMutation';
import ValidationsRouterForm from './ValidationsRouteForm';
// const
import { UPDATE_ROUTER_FORM } from '../../utils/constants';
import { isBrowser } from 'react-device-detect';

class RouterUpdateForm extends _RouterFormParentClass {
  IS_UPDATED_FORM = true;
  FORM_ID = UPDATE_ROUTER_FORM;
  MODEL_NAME = 'router';
  ROUTE_LIST_DIRECTION = '/network/routers';
  state = {
    editMode: false,
  };
  refetch = () => {
    this.props.relay.refetch(
      { routerId: this.props.router.id }, // Our refetchQuery needs to know the `routerID`
      null, // We can use the refetchVariables as renderVariables
      () => {
        this.updateBreadcrumbsData();
      },
      { force: true },
    );
  };
  handleSubmit = (router) => {
    this.setState({ editMode: false });
    UpdateRouterMutation(router, this);
  };
  render() {
    let { handleSubmit } = this.props;
    const { editMode } = this.state;
    const showBackButton = isBrowser;
    const nameIsEditable = false;
    return (
      <form id={this.FORM_ID} onSubmit={handleSubmit(this.handleSubmit)}>
        {isBrowser && this.renderSaveCancelButtons()}
        {this.renderHeader(nameIsEditable, showBackButton)}
        {this.renderModelMainSection(editMode)}
        {this.renderPortsToggleSection(editMode)}
        {editMode && this.renderBulkPortToggleSection()}
        {this.renderWorkLog()}
        {this.renderSaveCancelButtons()}
      </form>
    );
  }
}

RouterUpdateForm = reduxForm({
  validate: ValidationsRouterForm.validate,
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    document.documentElement.scrollTop = 0;
  },
})(RouterUpdateForm);

const RouterUpdateFragment = createRefetchContainer(
  withTranslation()(RouterUpdateForm),
  {
    router: graphql`
      fragment RouterUpdateForm_router on Router {
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
    query RouterUpdateFormRefetchQuery($routerId: ID!) {
      getRouterById(id: $routerId) {
        ...RouterUpdateForm_router
      }
    }
  `,
);

export default RouterUpdateFragment;
