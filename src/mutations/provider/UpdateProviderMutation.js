import { commitMutation } from 'react-relay';
// import { ConnectionHandler } from "relay-runtime";
import graphql from 'babel-plugin-relay/macro';

import i18n from '../../i18n';
import environment from '../../createRelayEnvironment';

const mutation = graphql`
  mutation UpdateProviderMutation($input: UpdateProviderInput!) {
    update_provider(input: $input) {
      errors {
        field
        messages
      }
      provider {
        id
        name
        description
        url
        __typename
        with_same_name {
          id
          name
          ... on Organization {
            website
            organization_id
            parent_organization {
              organization_id
            }
            affiliation_partner
            affiliation_customer
            affiliation_provider
            affiliation_host_user
            affiliation_site_owner
            affiliation_end_customer
            type {
              name
              value
            }
          }
          ... on EndUser {
            url
          }
          ... on Customer {
            url
          }
          ... on SiteOwner {
            url
          }
          ... on Provider {
            url
          }
          __typename
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
    }
  }
`;

export default function UpdateProviderMutation(provider, form) {
  const variables = {
    input: {
      id: provider.id,
      name: provider.name,
      description: provider.description,
      url: provider.url,
    },
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log('response: ', response);
      if (response.update_provider.errors) {
        form.props.notify(i18n.t('notify.error'), 'error');
        return response.update_provider.updated.errors;
      }
      form.props.reset();
      form.props.notify(i18n.t('notify.changes-saved'), 'success');
      if (!form.props.isFromModal) {
        form.refetch();
      }
    },
    updater: (store) => {},
    onError: (err) => console.error(err),
  });
}
