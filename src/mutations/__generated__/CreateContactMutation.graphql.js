/**
 * @flow
 * @relayHash 2463f83629bd4f1068aba621c35bda59
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NodeHandleNodeMeta = "LOCATION" | "LOGICAL" | "PHYSICAL" | "RELATION" | "%future added value";
export type CreateContactInput = {|
  contactType?: ?string,
  email?: ?string,
  firstName: string,
  lastName: string,
  mobile?: ?string,
  name: string,
  nodeMetaType: NodeHandleNodeMeta,
  nodeName: string,
  otherEmail?: ?string,
  phone?: ?string,
  salutation?: ?string,
  title?: ?string,
  rolesIds?: ?$ReadOnlyArray<string>,
  roles?: ?$ReadOnlyArray<ContactrolesRole>,
  clientMutationId: string,
|};
export type ContactrolesRole = {|
  name: string,
  nodeMetaType: NodeHandleNodeMeta,
  nodeName: string,
  contactsIds?: ?$ReadOnlyArray<string>,
  contacts?: ?$ReadOnlyArray<RolecontactsContact>,
|};
export type RolecontactsContact = {|
  contactType?: ?string,
  email?: ?string,
  firstName: string,
  lastName: string,
  mobile?: ?string,
  name: string,
  nodeMetaType: NodeHandleNodeMeta,
  nodeName: string,
  otherEmail?: ?string,
  phone?: ?string,
  salutation?: ?string,
  title?: ?string,
  rolesIds?: ?$ReadOnlyArray<string>,
  roles?: ?$ReadOnlyArray<ContactrolesRole>,
|};
export type CreateContactMutationVariables = {|
  input: CreateContactInput
|};
export type CreateContactMutationResponse = {|
  +createContact: ?{|
    +contact: ?{|
      +id: string,
      +nodeMetaType: NodeHandleNodeMeta,
      +nodeName: string,
      +name: string,
      +firstName: string,
      +lastName: string,
      +email: ?string,
      +phone: ?string,
    |}
  |}
|};
export type CreateContactMutation = {|
  variables: CreateContactMutationVariables,
  response: CreateContactMutationResponse,
|};
*/


/*
mutation CreateContactMutation(
  $input: CreateContactInput!
) {
  createContact(input: $input) {
    contact {
      id
      nodeMetaType
      nodeName
      name
      firstName
      lastName
      email
      phone
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateContactInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createContact",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateContactInput!"
      }
    ],
    "concreteType": "CreateContactPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "contact",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "nodeMetaType",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "nodeName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "firstName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lastName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "phone",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateContactMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateContactMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateContactMutation",
    "id": null,
    "text": "mutation CreateContactMutation(\n  $input: CreateContactInput!\n) {\n  createContact(input: $input) {\n    contact {\n      id\n      nodeMetaType\n      nodeName\n      name\n      firstName\n      lastName\n      email\n      phone\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '63d5c6f5c54570a4e2e1cf599f0e46d6';
module.exports = node;
