import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ROOT_ID } from 'relay-runtime';
import environment from '../../createRelayEnvironment';

const mutation = graphql`
  mutation DeleteOpticalNodeMutation($input: DeleteOpticalNodeInput!) {
    delete_opticalNode(input: $input) {
      success
    }
  }
`;

export default function DeleteOpticalNodeMutation(id, callback) {
  const variables = {
    input: {
      id,
      clientMutationId: '',
    },
  };
  commitMutation(environment, {
    mutation,
    variables,
    onError: (err) => console.error(err),
    onCompleted: (response) => {
      callback();
    },
    configs: [
      {
        parentName: ROOT_ID,
        parentID: ROOT_ID,
        deletedIDFieldName: 'id',
      },
    ],
  });
}
