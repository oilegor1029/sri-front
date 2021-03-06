const FIELD_TYPES = require('../FieldsTypes');
const COMMON_FIELDS = require('../CommonFields');

const ROUTER_COMMON_FIELDS = [
  ...COMMON_FIELDS.BASIC_INFO,
  ...COMMON_FIELDS.RACK_INFO,
  { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
  { type: FIELD_TYPES.SINGLE, name: 'model' },
  { type: FIELD_TYPES.SINGLE, name: 'version' },
  ...COMMON_FIELDS.PORT_LIST,
  ...COMMON_FIELDS.COMMENTS_FIELDS,
  ...COMMON_FIELDS.USER_CREATOR_MODIFIER_FIELDS,
];

const ROUTER_SUNET = [];

const ROUTER_NORDUNI = [];

module.exports = {
  ROUTER_COMMON_FIELDS,
  ROUTER_SUNET,
  ROUTER_NORDUNI,
};
