import { commitMutation } from 'react-relay';
// import { ConnectionHandler } from "relay-runtime";
import graphql from 'babel-plugin-relay/macro';

import i18n from '../../i18n';
import environment from '../../createRelayEnvironment';
import { generateSubInputs } from '../MutationsUtils';

const mutation = graphql`
  mutation UpdateCableMutation($input: CompositeCableMutationInput!) {
    composite_cable(input: $input) {
      updated {
        errors {
          field
          messages
        }
        cable {
          ...CableUpdateForm_cable
        }
      }
      subcreated {
        errors {
          field
          messages
        }
        port {
          id
          name
          port_type {
            value
          }
          description
          connected_to {
            id
            name
          }
        }
      }
    }
  }
`;

export default function UpdateCableMutation(cable, form) {
  const connections = generateSubInputs(cable.connections, 'port_type');
  const variables = {
    input: {
      update_input: {
        id: cable.id,
        name: cable.name,
        description: cable.description,
        cable_type: cable.cable_type,
        relationship_provider: cable.provider_id,
      },
      update_subinputs: connections.toUpdate,
      unlink_subinputs: connections.toUnlink,
      delete_subinputs: connections.toDelete,
    },
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      if (response.composite_cable.updated.errors) {
        form.props.notify(i18n.t('notify/generic-error'), 'error');
        return response.update_cable.updated.errors;
      }
      form.props.reset();
      if (form.props.isFromModal) {
        form.props.editedEntity('Cable', response.composite_cable.updated.cable.id);
      } else {
        form.refetch();
        form.props.notify(i18n.t('notify/changes-saved'), 'success');
      }
    },
    updater: () => {},
    onError: (err) => console.error(err),
  });
}
