export const FIELD_TYPES = {
  SINGLE: 'single_text',
  ARRAY_LIST: 'field_array_list',
  OBJ_TO_LIST: 'field_array_object_to_list',
  OBJECT: 'name_value_object',
  ID_OBJECT: 'id_name_object',
};
const BASIC_INFO = [
  { type: FIELD_TYPES.SINGLE, name: 'name' },
  { type: FIELD_TYPES.SINGLE, name: 'description' },
];
const RELATION_GROUP_INFO = [
  { type: FIELD_TYPES.ID_OBJECT, name: 'responsible_group' },
  { type: FIELD_TYPES.ID_OBJECT, name: 'support_group' },
];
const LOCATION_INFO = [
  { type: FIELD_TYPES.SINGLE, name: 'rack_units' },
  { type: FIELD_TYPES.SINGLE, name: 'rack_position' },
];
const BASIC_OPERATIVE_SYSTEM = [
  { type: FIELD_TYPES.SINGLE, name: 'os' },
  { type: FIELD_TYPES.SINGLE, name: 'os_version' },
];
const PHYSICAL_BASIC_DATA = [
  { type: FIELD_TYPES.OBJECT, name: 'managed_by' },
  { type: FIELD_TYPES.SINGLE, name: 'backup' },
  { type: FIELD_TYPES.SINGLE, name: 'contract_number' },
  { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
];
const genericNetworkOrganization = {
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'url' },
    { type: FIELD_TYPES.SINGLE, name: 'with_same_name' },
  ],
};
const customer = {
  formName: {
    create: 'createCustomer',
    update: 'updateCustomer',
  },
  ...genericNetworkOrganization,
};
const endUser = {
  formName: {
    create: 'createEndUser',
    update: 'updateEndUser',
  },
  ...genericNetworkOrganization,
};
const provider = {
  formName: {
    create: 'createProvider',
    update: 'updateProvider',
  },
  ...genericNetworkOrganization,
};
const siteOwner = {
  formName: {
    create: 'createSiteOwner',
    update: 'updateSiteOwner',
  },
  ...genericNetworkOrganization,
};
const switchEntity = {
  formName: {
    create: 'createSwitch',
    update: 'updateSwitch',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'ownersDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'ownersDetails'],
  fields: [
    ...BASIC_INFO,
    ...PHYSICAL_BASIC_DATA,
    ...BASIC_OPERATIVE_SYSTEM,
    ...LOCATION_INFO,
    ...RELATION_GROUP_INFO,
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
    { type: FIELD_TYPES.SINGLE, name: 'ip_addresses' },
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
  ],
};
const firewall = {
  formName: {
    create: 'createSwitch',
    update: 'updateSwitch',
  },
  dispatchPropertiesListCreate: ['notify'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    ...BASIC_INFO,
    ...PHYSICAL_BASIC_DATA,
    ...BASIC_OPERATIVE_SYSTEM,
    ...LOCATION_INFO,
    ...RELATION_GROUP_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'owner' },
    { type: FIELD_TYPES.SINGLE, name: 'model' },
    { type: FIELD_TYPES.SINGLE, name: 'vendor' },
    { type: FIELD_TYPES.SINGLE, name: 'end_support' },
    { type: FIELD_TYPES.OBJECT, name: 'security_class' },
    { type: FIELD_TYPES.SINGLE, name: 'security_comment' },
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
    { type: FIELD_TYPES.SINGLE, name: 'service_tag' },
  ],
};
const externalEquipment = {
  formName: {
    create: 'createExternalEquipment',
    update: 'updateExternalEquipment',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'ownersDetails', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'ownersDetails', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...LOCATION_INFO,
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'owner' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};
const host = {
  formName: {
    create: 'createHost',
    update: 'updateHost',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'ownersDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'ownersDetails'],
  fields: [
    ...BASIC_INFO,
    ...RELATION_GROUP_INFO,
    ...BASIC_OPERATIVE_SYSTEM,
    ...LOCATION_INFO,
    ...PHYSICAL_BASIC_DATA,
    { type: FIELD_TYPES.SINGLE, name: 'ip_addresses' },
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'owner' },
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'host_user' },
    { type: FIELD_TYPES.SINGLE, name: 'host_type' },
  ],
};
export default {
  customer,
  endUser,
  provider,
  siteOwner,
  host,
  externalEquipment,
  switch: switchEntity,
  firewall,
};