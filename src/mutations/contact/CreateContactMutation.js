import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../../createRelayEnvironment";
import { ROOT_ID } from "relay-runtime";

import UpdateContactInlineMutation from "./UpdateContactInlineMutation";
import CreateComentMutation from "../CreateCommentMutation";
import CreateEmailMutation from "../CreateEmailMutation";
import CreatePhoneMutation from "../CreatePhoneMutation";

const mutation = graphql`
    mutation CreateContactMutation($input: CreateContactInput!) {
        create_contact(input: $input) {
            errors {
                field
                messages
            }
            contact {
                handle_id
                title
                first_name
                last_name
                notes
                contact_type
                pgp_fingerprint
                emails {
                    handle_id
                    name
                    type
                }
                phones {
                    handle_id
                    name
                    type
                }
                roles {
                    name
                    end {
                        handle_id
                        name
                    }
                }
                member_of_groups {
                    name
                }
            }
        }
    }
`;

let tempID = 0;

function CreateContactMutation(contact, callback) {
    let fullName = contact.name;
    fullName = fullName.split(" ");
    contact.first_name = fullName[0];
    contact.last_name = fullName[1];

    const variables = {
        input: {
            title: contact.title,
            first_name: contact.first_name,
            last_name: contact.last_name,
            notes: contact.notes,
            pgp_fingerprint: contact.pgp_fingerprint,
            contact_type: contact.contact_type,
            clientMutationId: tempID++
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            if (response.create_contact.errors) {
                return response.create_contact.errors;
            } else {
                const contact_id = response.create_contact.contact.handle_id;
                if (contact.comment) {
                    CreateComentMutation(contact_id, contact.comment);
                }
                const emails = contact.emails;
                Object.keys(emails).forEach((email) => {
                    CreateEmailMutation(contact_id, emails[email].email, emails[email].type);
                });
                const phones = contact.phones;
                Object.keys(phones).forEach((phone) => {
                    CreatePhoneMutation(contact_id, phones[phone].phone, phones[phone].type);
                });
                const organizations = contact.organizations;
                Object.keys(organizations).forEach((organization_key) => {
                    let organization = organizations[organization_key];
                    UpdateContactInlineMutation(
                        response.create_contact.contact,
                        organization.organization,
                        null,
                        organization.role
                    );
                });

                callback.push("/community/contacts/" + contact_id);
            }
        },
        onError: (errors) => console.error(errors),
        configs: [
            {
                type: "RANGE_ADD",
                parentName: ROOT_ID,
                parentID: ROOT_ID,
                connectionInfo: [
                    {
                        key: "ContactList_contacts",
                        rangeBehavior: "append"
                    }
                ],
                edgeName: "contactEdge"
            }
        ]
    });
}

export default CreateContactMutation;