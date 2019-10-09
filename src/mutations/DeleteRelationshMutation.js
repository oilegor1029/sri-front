import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../createRelayEnvironment";

const mutation = graphql`
    mutation DeleteRelationshMutation($input: DeleteRelationshipInput!) {
        delete_relationship(input: $input) {
            success
        }
    }
`;

export default function DeleteRelationshMutation(relation_id) {
    const variables = {
        input: {
            relation_id: relation_id,
            clientMutationId: ""
        }
    };
    commitMutation(environment, {
        mutation,
        variables,
        onError: (err) => console.error(err),
        onCompleted: (response) => {
            console.log(response);
        }
    });
}
