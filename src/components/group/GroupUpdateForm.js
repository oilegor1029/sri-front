import _GroupFormParentClass from './_GroupFormParentClass';
// Common imports
import React from 'react';
import { withTranslation } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import UpdateGroupMutation from '../../mutations/group/UpdateGroupMutation';
import ValidationsGroupForm from './ValidationsGroupForm';
// const
import { UPDATE_GROUP_FORM, REMOVE } from '../../utils/constants';
import { isBrowser } from 'react-device-detect';

class GroupUpdateForm extends _GroupFormParentClass {
  IS_UPDATED_FORM = true;
  FORM_ID = UPDATE_GROUP_FORM;
  state = {
    editMode: false,
  };

  refetch = () => {
    this.props.relay.refetch(
      { groupId: this.props.group.id }, // Our refetchQuery needs to know the `groupID`
      null, // We can use the refetchVariables as renderVariables
      () => {
        this.updateBreadcrumbsData();
      },
      { force: true },
    );
  };

  handleSubmit = (entityData) => {
    this.setState({ editMode: false });
    const someItemWillBeDeleted = entityData.members.filter((contact) => contact.status === REMOVE).length > 0;
    if (someItemWillBeDeleted) {
      this.entityDataToUpdate = entityData;
      this.props.showModalConfirm('partialDelete');
    } else {
      this.updateMutation(entityData, this);
    }
  };

  updateMutation(entityData, form) {
    UpdateGroupMutation(entityData, form);
  }

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

GroupUpdateForm = reduxForm({
  form: 'updateGroup',
  validate: ValidationsGroupForm.validate,
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch, props) => {
    document.documentElement.scrollTop = 0;
  },
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
          contact_type {
            name
            value
          }
          emails {
            id
            name
            type {
              name
              value
            }
          }
          phones {
            id
            name
            type {
              name
              value
            }
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
    `,
  },

  graphql`
    # Refetch query to be fetched upon calling 'refetch'.
    # Notice that we re-use our fragment and the shape of this query matches our fragment spec.
    query GroupUpdateFormRefetchQuery($groupId: ID!) {
      getGroupById(id: $groupId) {
        ...GroupUpdateForm_group
      }
    }
  `,
);

export default GroupUpdateFragment;
