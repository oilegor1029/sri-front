/**
 * @flow
 * @relayHash 16aeb9041e2cdeac6b996270c3808e80
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizationUpdateForm_organization$ref = any;
export type OrganizationDetailsQueryVariables = {|
  organizationId: number
|};
export type OrganizationDetailsQueryResponse = {|
  +getOrganizationById: ?{|
    +handle_id: string,
    +name: string,
    +type: ?any,
    +description: ?string,
    +incident_management_info: ?string,
    +addresses: ?$ReadOnlyArray<?{|
      +handle_id: string,
      +website: ?string,
      +street: ?string,
      +postal_code: ?string,
      +postal_area: ?string,
      +phone: ?string,
    |}>,
    +incoming: ?$ReadOnlyArray<?{|
      +name: string,
      +relation: {|
        +relation_id: number,
        +type: string,
        +end: {|
          +handle_id: string,
          +node_name: string,
        |},
        +start: {|
          +handle_id: string,
          +node_name: string,
        |},
      |},
    |}>,
    +comments: ?$ReadOnlyArray<?{|
      +id: string,
      +user: ?{|
        +first_name: string,
        +last_name: string,
      |},
      +comment: string,
      +submit_date: any,
    |}>,
    +created: any,
    +creator: {|
      +email: string
    |},
    +modified: any,
    +modifier: {|
      +email: string
    |},
    +$fragmentRefs: OrganizationUpdateForm_organization$ref,
  |},
  +getOrganizationContacts: ?$ReadOnlyArray<?{|
    +relation_id: ?number,
    +contact: ?{|
      +handle_id: string,
      +first_name: string,
      +last_name: string,
      +contact_type: ?string,
      +emails: ?$ReadOnlyArray<?{|
        +handle_id: string,
        +name: string,
        +type: any,
      |}>,
      +phones: ?$ReadOnlyArray<?{|
        +handle_id: string,
        +name: string,
        +type: any,
      |}>,
      +roles: ?$ReadOnlyArray<?{|
        +name: ?string,
        +end: ?{|
          +handle_id: string,
          +name: string,
        |},
      |}>,
    |},
    +role: ?{|
      +handle_id: string,
      +name: string,
    |},
  |}>,
|};
export type OrganizationDetailsQuery = {|
  variables: OrganizationDetailsQueryVariables,
  response: OrganizationDetailsQueryResponse,
|};
*/


/*
query OrganizationDetailsQuery(
  $organizationId: Int!
) {
  getOrganizationById(handle_id: $organizationId) {
    ...OrganizationUpdateForm_organization
    handle_id
    name
    type
    description
    incident_management_info
    addresses {
      handle_id
      website
      street
      postal_code
      postal_area
      phone
      id
    }
    incoming {
      name
      relation {
        relation_id
        type
        end {
          handle_id
          node_name
          id
        }
        start {
          handle_id
          node_name
          id
        }
        id
      }
    }
    comments {
      id
      user {
        first_name
        last_name
        id
      }
      comment
      submit_date
    }
    created
    creator {
      email
      id
    }
    modified
    modifier {
      email
      id
    }
    id
  }
  getOrganizationContacts(handle_id: $organizationId) {
    relation_id
    contact {
      handle_id
      first_name
      last_name
      contact_type
      emails {
        handle_id
        name
        type
        id
      }
      phones {
        handle_id
        name
        type
        id
      }
      roles {
        name
        end {
          handle_id
          name
          id
        }
      }
      id
    }
    role {
      handle_id
      name
    }
  }
}

fragment OrganizationUpdateForm_organization on Organization {
  handle_id
  name
  type
  description
  incident_management_info
  addresses {
    handle_id
    website
    street
    postal_code
    postal_area
    phone
    id
  }
  incoming {
    name
    relation {
      relation_id
      type
      end {
        handle_id
        node_name
        id
      }
      start {
        handle_id
        node_name
        id
      }
      id
    }
  }
  comments {
    id
    user {
      first_name
      last_name
      id
    }
    comment
    submit_date
  }
  created
  creator {
    email
    id
  }
  modified
  modifier {
    email
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "organizationId",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "handle_id",
    "variableName": "organizationId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "handle_id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "incident_management_info",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "website",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "street",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "postal_code",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "postal_area",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "relation_id",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "node_name",
  "args": null,
  "storageKey": null
},
v14 = [
  (v2/*: any*/),
  (v13/*: any*/)
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "first_name",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "last_name",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "comment",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "submit_date",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v22 = [
  (v21/*: any*/)
],
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "modified",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "contact_type",
  "args": null,
  "storageKey": null
},
v25 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v26 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v27 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "role",
  "storageKey": null,
  "args": null,
  "concreteType": "Role",
  "plural": false,
  "selections": (v26/*: any*/)
},
v28 = [
  (v2/*: any*/),
  (v13/*: any*/),
  (v15/*: any*/)
],
v29 = [
  (v21/*: any*/),
  (v15/*: any*/)
],
v30 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  (v15/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OrganizationDetailsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getOrganizationById",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "addresses",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "incoming",
            "storageKey": null,
            "args": null,
            "concreteType": "DictRelationType",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "relation",
                "storageKey": null,
                "args": null,
                "concreteType": "NIRelationType",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "end",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "NINodeHandlerType",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "start",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "NINodeHandlerType",
                    "plural": false,
                    "selections": (v14/*: any*/)
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "comments",
            "storageKey": null,
            "args": null,
            "concreteType": "CommentType",
            "plural": true,
            "selections": [
              (v15/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  (v16/*: any*/),
                  (v17/*: any*/)
                ]
              },
              (v18/*: any*/),
              (v19/*: any*/)
            ]
          },
          (v20/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creator",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": (v22/*: any*/)
          },
          (v23/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "modifier",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": (v22/*: any*/)
          },
          {
            "kind": "FragmentSpread",
            "name": "OrganizationUpdateForm_organization",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getOrganizationContacts",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ContactWithRolename",
        "plural": true,
        "selections": [
          (v12/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contact",
            "storageKey": null,
            "args": null,
            "concreteType": "Contact",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v24/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "emails",
                "storageKey": null,
                "args": null,
                "concreteType": "Email",
                "plural": true,
                "selections": (v25/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "phones",
                "storageKey": null,
                "args": null,
                "concreteType": "Phone",
                "plural": true,
                "selections": (v25/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "roles",
                "storageKey": null,
                "args": null,
                "concreteType": "RoleRelation",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "end",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Organization",
                    "plural": false,
                    "selections": (v26/*: any*/)
                  }
                ]
              }
            ]
          },
          (v27/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OrganizationDetailsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getOrganizationById",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "addresses",
            "storageKey": null,
            "args": null,
            "concreteType": "Address",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v15/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "incoming",
            "storageKey": null,
            "args": null,
            "concreteType": "DictRelationType",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "relation",
                "storageKey": null,
                "args": null,
                "concreteType": "NIRelationType",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "end",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "NINodeHandlerType",
                    "plural": false,
                    "selections": (v28/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "start",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "NINodeHandlerType",
                    "plural": false,
                    "selections": (v28/*: any*/)
                  },
                  (v15/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "comments",
            "storageKey": null,
            "args": null,
            "concreteType": "CommentType",
            "plural": true,
            "selections": [
              (v15/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v15/*: any*/)
                ]
              },
              (v18/*: any*/),
              (v19/*: any*/)
            ]
          },
          (v20/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creator",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": (v29/*: any*/)
          },
          (v23/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "modifier",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": (v29/*: any*/)
          },
          (v15/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getOrganizationContacts",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ContactWithRolename",
        "plural": true,
        "selections": [
          (v12/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contact",
            "storageKey": null,
            "args": null,
            "concreteType": "Contact",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v24/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "emails",
                "storageKey": null,
                "args": null,
                "concreteType": "Email",
                "plural": true,
                "selections": (v30/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "phones",
                "storageKey": null,
                "args": null,
                "concreteType": "Phone",
                "plural": true,
                "selections": (v30/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "roles",
                "storageKey": null,
                "args": null,
                "concreteType": "RoleRelation",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "end",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Organization",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v15/*: any*/)
                    ]
                  }
                ]
              },
              (v15/*: any*/)
            ]
          },
          (v27/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "OrganizationDetailsQuery",
    "id": null,
    "text": "query OrganizationDetailsQuery(\n  $organizationId: Int!\n) {\n  getOrganizationById(handle_id: $organizationId) {\n    ...OrganizationUpdateForm_organization\n    handle_id\n    name\n    type\n    description\n    incident_management_info\n    addresses {\n      handle_id\n      website\n      street\n      postal_code\n      postal_area\n      phone\n      id\n    }\n    incoming {\n      name\n      relation {\n        relation_id\n        type\n        end {\n          handle_id\n          node_name\n          id\n        }\n        start {\n          handle_id\n          node_name\n          id\n        }\n        id\n      }\n    }\n    comments {\n      id\n      user {\n        first_name\n        last_name\n        id\n      }\n      comment\n      submit_date\n    }\n    created\n    creator {\n      email\n      id\n    }\n    modified\n    modifier {\n      email\n      id\n    }\n    id\n  }\n  getOrganizationContacts(handle_id: $organizationId) {\n    relation_id\n    contact {\n      handle_id\n      first_name\n      last_name\n      contact_type\n      emails {\n        handle_id\n        name\n        type\n        id\n      }\n      phones {\n        handle_id\n        name\n        type\n        id\n      }\n      roles {\n        name\n        end {\n          handle_id\n          name\n          id\n        }\n      }\n      id\n    }\n    role {\n      handle_id\n      name\n    }\n  }\n}\n\nfragment OrganizationUpdateForm_organization on Organization {\n  handle_id\n  name\n  type\n  description\n  incident_management_info\n  addresses {\n    handle_id\n    website\n    street\n    postal_code\n    postal_area\n    phone\n    id\n  }\n  incoming {\n    name\n    relation {\n      relation_id\n      type\n      end {\n        handle_id\n        node_name\n        id\n      }\n      start {\n        handle_id\n        node_name\n        id\n      }\n      id\n    }\n  }\n  comments {\n    id\n    user {\n      first_name\n      last_name\n      id\n    }\n    comment\n    submit_date\n  }\n  created\n  creator {\n    email\n    id\n  }\n  modified\n  modifier {\n    email\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '86134564f8ea9248905e103b0622c682';
module.exports = node;