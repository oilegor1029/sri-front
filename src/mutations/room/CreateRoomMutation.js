import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../createRelayEnvironment';
import { ROOT_ID } from 'relay-runtime';
import i18n from '../../i18n';
import CreateCommentMutation from '../CreateCommentMutation';

const mutation = graphql`
  mutation CreateRoomMutation($input: CompositeRoomMutationInput!) {
    composite_room(input: $input) {
      created {
        errors {
          field
          messages
        }
        room {
          ...RoomUpdateForm_room
        }
      }
    }
  }
`;

function CreateRoomMutation(room, form) {
  const variables = {
    input: {
      create_input: {
        name: room.name,
        description: room.description,
      },
    },
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      if (response.composite_room.created.errors) {
        form.props.notify(i18n.t('notify/generic-error'), 'error');
        return response.composite_room.created.errors;
      }
      const entityId = response.composite_room.created.room.__id;
      if (room.comment) {
        CreateCommentMutation(entityId, room.comment);
      }
      form.props.notify(i18n.t('entity-notify-create/rooms'), 'success');
      if (form.props.history) {
        form.props.history.push(`/network/location-rooms/${entityId}`);
      } else {
        form.props.createdEntity('Room', entityId);
        form.props.hideModalForm();
      }
    },
    onError: (errors) => console.error(errors),
    configs: [
      {
        type: 'RANGE_ADD',
        parentName: ROOT_ID,
        parentID: ROOT_ID,
      },
    ],
  });
}

export default CreateRoomMutation;
