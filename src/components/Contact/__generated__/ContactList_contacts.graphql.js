/**
 * @flow
 */

/* eslint-disable */

"use strict";

/*::
import type { ReaderFragment } from 'relay-runtime';
type ContactRow_contact$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactList_contacts$ref: FragmentReference;
export type ContactList_contacts = {|
  +contacts: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +$fragmentRefs: ContactRow_contact$ref
      |}
    |}>,
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
    |},
  |},
  +$refType: ContactList_contacts$ref,
|};
*/

const node /*: ReaderFragment*/ = {
    kind: "Fragment",
    name: "ContactList_contacts",
    type: "Query",
    metadata: {
        connection: [
            {
                count: "count",
                cursor: "cursor",
                direction: "forward",
                path: ["contacts"]
            }
        ]
    },
    argumentDefinitions: [
        {
            kind: "LocalArgument",
            name: "count",
            type: "Int",
            defaultValue: null
        },
        {
            kind: "LocalArgument",
            name: "cursor",
            type: "String",
            defaultValue: null
        }
    ],
    selections: [
        {
            kind: "LinkedField",
            alias: "contacts",
            name: "__ContactList_contacts_connection",
            storageKey: null,
            args: null,
            concreteType: "ContactConnection",
            plural: false,
            selections: [
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "edges",
                    storageKey: null,
                    args: null,
                    concreteType: "ContactEdge",
                    plural: true,
                    selections: [
                        {
                            kind: "LinkedField",
                            alias: null,
                            name: "node",
                            storageKey: null,
                            args: null,
                            concreteType: "Contact",
                            plural: false,
                            selections: [
                                {
                                    kind: "FragmentSpread",
                                    name: "ContactRow_contact",
                                    args: null
                                },
                                {
                                    kind: "ScalarField",
                                    alias: null,
                                    name: "__typename",
                                    args: null,
                                    storageKey: null
                                }
                            ]
                        },
                        {
                            kind: "ScalarField",
                            alias: null,
                            name: "cursor",
                            args: null,
                            storageKey: null
                        }
                    ]
                },
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "pageInfo",
                    storageKey: null,
                    args: null,
                    concreteType: "PageInfo",
                    plural: false,
                    selections: [
                        {
                            kind: "ScalarField",
                            alias: null,
                            name: "hasNextPage",
                            args: null,
                            storageKey: null
                        },
                        {
                            kind: "ScalarField",
                            alias: null,
                            name: "endCursor",
                            args: null,
                            storageKey: null
                        }
                    ]
                }
            ]
        }
    ]
};
// prettier-ignore
(node/*: any*/).hash = '33ed34ac343630333ac90c59cd19bba3';
module.exports = node;
