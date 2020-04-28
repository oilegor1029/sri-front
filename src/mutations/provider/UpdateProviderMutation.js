import { commitMutation } from "react-relay";
// import { ConnectionHandler } from "relay-runtime";
import graphql from "babel-plugin-relay/macro";

import i18n from "../../i18n";
import environment from "../../createRelayEnvironment";

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
            url: provider.url
        }
    };
    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            console.log("response: ", response);
            if (response.update_provider.errors) {
                form.props.notify(i18n.t("notify.error"), "error");
                return response.update_provider.updated.errors;
            } else {
                form.props.reset();
                form.refetch();
                form.props.notify(i18n.t("notify.changes-saved"), "success");
            }
        },
        updater: (store) => {},
        onError: (err) => console.error(err)
    });
}
