const FIELD_TYPES = require('../FieldsTypes');
const COMMON_FIELDS = require('../CommonFields');

const SERVICE_COMMON_FIELDS = [
  ...COMMON_FIELDS.BASIC_INFO,
  ...COMMON_FIELDS.COMMENTS_FIELDS,
  ...COMMON_FIELDS.USER_CREATOR_MODIFIER_FIELDS,
];

const SERVICE_SUNET = [];

const SERVICE_NORDUNI = [];

module.exports = {
  SERVICE_COMMON_FIELDS,
  SERVICE_SUNET,
  SERVICE_NORDUNI,
};
