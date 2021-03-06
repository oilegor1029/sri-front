import { commitMutation } from 'react-relay';
// import { ConnectionHandler } from "relay-runtime";
import graphql from 'babel-plugin-relay/macro';

import { SAVED, REMOVE } from '../../utils/constants';

import i18n from '../../i18n';
import environment from '../../createRelayEnvironment';

import { generatePortForInput } from '../MutationsUtils';

const mutation = graphql`
  mutation UpdateHostMutation($input: CompositeHostMutationInput!) {
    composite_host(input: $input) {
      updated {
        errors {
          field
          messages
        }
        host {
          id
          name
          operational_state {
            value
            name
          }
          description
          host_type
          ip_addresses
          host_user {
            id
            name
            __typename
          }
          owner: host_owner {
            __typename
            id
            name
            ... on EndUser {
              type: node_type {
                name: type
              }
            }
            ... on Customer {
              type: node_type {
                name: type
              }
            }
            ... on Provider {
              type: node_type {
                name: type
              }
            }
            ... on HostUser {
              type: node_type {
                name: type
              }
            }
          }
          location {
            id
            name
          }
          responsible_group {
            id
            name
          }
          support_group {
            id
            name
          }
          managed_by {
            value
          }
          backup
          os
          os_version
          contract_number
          rack_units
          rack_position
          rack_back
        }
      }
    }
  }
`;

export default function UpdateHostMutation(host, form) {
  const ownerToSaved = host.owner ? host.owner.find((o) => o.status === SAVED) : null;
  const ownerToRemove = host.owner ? host.owner.find((o) => o.status === REMOVE) : null;
  const hostUserToSaved = host.host_user ? host.host_user.find((hu) => hu.status === SAVED) : null;
  const ports = generatePortForInput(host.ports);
  const variables = {
    input: {
      update_input: {
        id: host.id,
        name: host.name,
        description: host.description,
        ip_addresses: host.ip_addresses ? host.ip_addresses.join('\n') : null,
        rack_units: host.rack_units,
        rack_position: host.rack_position,
        rack_back: host.rack_back,
        operational_state: host.operational_state,
        responsible_group: host.responsible_group_id,
        support_group: host.support_group_id,
        managed_by: host.managed_by,
        backup: host.backup,
        os: host.os,
        os_version: host.os_version,
        contract_number: host.contract_number,
        relationship_owner: ownerToSaved ? ownerToSaved.id : '',
        relationship_user: hostUserToSaved ? hostUserToSaved.id : '',
        relationship_location: host.location && host.location.length ? host.location[0].id : null,
      },
      unlink_subinputs: ports.toUnlink,
      update_subinputs: ports.toSaved,
      delete_subinputs: ports.toRemove,
      create_subinputs: ports.toCreate,
    },
  };
  if (ownerToRemove) {
    variables.input.delete_owner = {
      id: ownerToRemove.id,
    };
  }
  console.log(JSON.stringify(variables));
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      if (response.composite_host.updated.errors) {
        form.props.notify(i18n.t('notify/generic-error'), 'error');
        return response.update_host.updated.errors;
      }
      form.props.reset();
      if (form.props.isFromModal) {
        form.props.editedEntity('Host', response.composite_host.updated.host.id);
      } else {
        form.refetch();
        form.props.notify(i18n.t('notify/changes-saved'), 'success');
      }
    },
    updater: (store) => {},
    onError: (err) => console.error(err),
  });
}
