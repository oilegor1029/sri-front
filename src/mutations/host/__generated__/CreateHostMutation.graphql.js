/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CompositeHostMutationInput = {|
  delete_owner?: ?DeleteOwnerMutationInput,
  create_input?: ?CreateHostInput,
  update_input?: ?EditHostInput,
  unlink_subinputs?: ?$ReadOnlyArray<?DeleteRelationshipInput>,
  clientMutationId?: ?string,
|};
export type DeleteOwnerMutationInput = {|
  id: string,
  clientMutationId?: ?string,
|};
export type CreateHostInput = {|
  rack_units?: ?number,
  rack_position?: ?number,
  rack_back?: ?boolean,
  name: string,
  description?: ?string,
  ip_addresses?: ?string,
  operational_state: any,
  managed_by?: ?any,
  responsible_group?: ?any,
  support_group?: ?any,
  backup?: ?string,
  security_class?: ?any,
  security_comment?: ?string,
  os?: ?string,
  os_version?: ?string,
  model?: ?string,
  vendor?: ?string,
  service_tag?: ?string,
  end_support?: ?any,
  contract_number?: ?string,
  relationship_location?: ?number,
  relationship_owner?: ?any,
  clientMutationId?: ?string,
|};
export type EditHostInput = {|
  rack_units?: ?number,
  rack_position?: ?number,
  rack_back?: ?boolean,
  name: string,
  description?: ?string,
  ip_addresses?: ?string,
  operational_state: any,
  managed_by?: ?any,
  responsible_group?: ?any,
  support_group?: ?any,
  backup?: ?string,
  security_class?: ?any,
  security_comment?: ?string,
  os?: ?string,
  os_version?: ?string,
  model?: ?string,
  vendor?: ?string,
  service_tag?: ?string,
  end_support?: ?any,
  contract_number?: ?string,
  relationship_location?: ?number,
  relationship_owner?: ?any,
  relationship_user?: ?any,
  relationship_depends_on?: ?number,
  services_locked?: ?boolean,
  services_checked?: ?boolean,
  id: string,
  clientMutationId?: ?string,
|};
export type DeleteRelationshipInput = {|
  relation_id: number,
  clientMutationId?: ?string,
|};
export type CreateHostMutationVariables = {|
  input: CompositeHostMutationInput
|};
export type CreateHostMutationResponse = {|
  +composite_host: ?{|
    +created: ?{|
      +errors: ?$ReadOnlyArray<?{|
        +field: string,
        +messages: $ReadOnlyArray<string>,
      |}>,
      +host: ?{|
        +id: string,
        +name: string,
        +operational_state: ?{|
          +name: string,
          +value: string,
        |},
        +description: ?string,
        +host_type: ?string,
        +ip_addresses: ?any,
        +host_user: ?{|
          +id: string,
          +name: string,
          +__typename: string,
        |},
        +owner: ?{|
          +__typename: string,
          +id: string,
          +name: string,
          +type?: {|
            +name: string
          |},
        |},
        +responsible_group: ?{|
          +id: string,
          +name: string,
        |},
        +support_group: ?{|
          +id: string,
          +name: string,
        |},
        +managed_by: ?{|
          +value: string
        |},
        +backup: ?string,
        +os: ?string,
        +os_version: ?string,
        +contract_number: ?string,
        +rack_units: ?number,
        +rack_position: ?number,
      |},
    |}
  |}
|};
export type CreateHostMutation = {|
  variables: CreateHostMutationVariables,
  response: CreateHostMutationResponse,
|};
*/


/*
mutation CreateHostMutation(
  $input: CompositeHostMutationInput!
) {
  composite_host(input: $input) {
    created {
      errors {
        field
        messages
      }
      host {
        id
        name
        operational_state {
          name
          value
          id
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
              id
            }
          }
          ... on Customer {
            type: node_type {
              name: type
              id
            }
          }
          ... on HostUser {
            type: node_type {
              name: type
              id
            }
          }
          ... on Provider {
            type: node_type {
              name: type
              id
            }
          }
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
          id
        }
        backup
        os
        os_version
        contract_number
        rack_units
        rack_position
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CompositeHostMutationInput!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "ErrorType",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "field",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "messages",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "host_type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ip_addresses",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "HostUser",
  "kind": "LinkedField",
  "name": "host_user",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": "name",
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v12 = [
  {
    "alias": "type",
    "args": null,
    "concreteType": "NINodeType",
    "kind": "LinkedField",
    "name": "node_type",
    "plural": false,
    "selections": [
      (v11/*: any*/)
    ],
    "storageKey": null
  }
],
v13 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Group",
  "kind": "LinkedField",
  "name": "responsible_group",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Group",
  "kind": "LinkedField",
  "name": "support_group",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "backup",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "os",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "os_version",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contract_number",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rack_units",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rack_position",
  "storageKey": null
},
v22 = [
  {
    "alias": "type",
    "args": null,
    "concreteType": "NINodeType",
    "kind": "LinkedField",
    "name": "node_type",
    "plural": false,
    "selections": [
      (v11/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateHostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CompositeHostMutationPayload",
        "kind": "LinkedField",
        "name": "composite_host",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CreateHostPayload",
            "kind": "LinkedField",
            "name": "created",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Host",
                "kind": "LinkedField",
                "name": "host",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Choice",
                    "kind": "LinkedField",
                    "name": "operational_state",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": "owner",
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "host_owner",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
                        "type": "EndUser"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
                        "type": "Customer"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
                        "type": "HostUser"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
                        "type": "Provider"
                      }
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Choice",
                    "kind": "LinkedField",
                    "name": "managed_by",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateHostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CompositeHostMutationPayload",
        "kind": "LinkedField",
        "name": "composite_host",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CreateHostPayload",
            "kind": "LinkedField",
            "name": "created",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Host",
                "kind": "LinkedField",
                "name": "host",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Choice",
                    "kind": "LinkedField",
                    "name": "operational_state",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": "owner",
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "host_owner",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
                        "type": "EndUser"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
                        "type": "Customer"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
                        "type": "HostUser"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v22/*: any*/),
                        "type": "Provider"
                      }
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Choice",
                    "kind": "LinkedField",
                    "name": "managed_by",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CreateHostMutation",
    "operationKind": "mutation",
    "text": "mutation CreateHostMutation(\n  $input: CompositeHostMutationInput!\n) {\n  composite_host(input: $input) {\n    created {\n      errors {\n        field\n        messages\n      }\n      host {\n        id\n        name\n        operational_state {\n          name\n          value\n          id\n        }\n        description\n        host_type\n        ip_addresses\n        host_user {\n          id\n          name\n          __typename\n        }\n        owner: host_owner {\n          __typename\n          id\n          name\n          ... on EndUser {\n            type: node_type {\n              name: type\n              id\n            }\n          }\n          ... on Customer {\n            type: node_type {\n              name: type\n              id\n            }\n          }\n          ... on HostUser {\n            type: node_type {\n              name: type\n              id\n            }\n          }\n          ... on Provider {\n            type: node_type {\n              name: type\n              id\n            }\n          }\n        }\n        responsible_group {\n          id\n          name\n        }\n        support_group {\n          id\n          name\n        }\n        managed_by {\n          value\n          id\n        }\n        backup\n        os\n        os_version\n        contract_number\n        rack_units\n        rack_position\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9be137da0a17848b2543d20cb01ed336';

module.exports = node;
