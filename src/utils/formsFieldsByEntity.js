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
const RACK_INFO = [
  { type: FIELD_TYPES.SINGLE, name: 'rack_units' },
  { type: FIELD_TYPES.SINGLE, name: 'rack_position' },
  { type: FIELD_TYPES.SINGLE, name: 'rack_back' },
  { type: FIELD_TYPES.OBJ_TO_LIST, name: 'location' },
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
  dispatchPropertiesListCreate: ['notify', 'modal', 'ownersDetails', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'ownersDetails', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...PHYSICAL_BASIC_DATA,
    ...BASIC_OPERATIVE_SYSTEM,
    ...RACK_INFO,
    ...RELATION_GROUP_INFO,
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
    { type: FIELD_TYPES.SINGLE, name: 'ip_addresses' },
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};
const firewall = {
  formName: {
    create: 'createFirewall',
    update: 'updateFirewall',
  },
  dispatchPropertiesListCreate: ['notify'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...PHYSICAL_BASIC_DATA,
    ...BASIC_OPERATIVE_SYSTEM,
    ...RACK_INFO,
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
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};
const router = {
  formName: {
    create: 'createRouter',
    update: 'updateRouter',
  },
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...RACK_INFO,
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.SINGLE, name: 'model' },
    { type: FIELD_TYPES.SINGLE, name: 'version' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
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
    ...RACK_INFO,
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'owner' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};
const host = {
  formName: {
    create: 'createHost',
    update: 'updateHost',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'ownersDetails', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'ownersDetails', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...RELATION_GROUP_INFO,
    ...BASIC_OPERATIVE_SYSTEM,
    ...RACK_INFO,
    ...PHYSICAL_BASIC_DATA,
    { type: FIELD_TYPES.SINGLE, name: 'ip_addresses' },
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'owner' },
    { type: FIELD_TYPES.OBJ_TO_LIST, name: 'host_user' },
    { type: FIELD_TYPES.SINGLE, name: 'host_type' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};
const peeringPartner = {
  formName: {
    update: 'updatePeeringPartner',
  },
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    { type: FIELD_TYPES.SINGLE, name: 'name' },
    { type: FIELD_TYPES.SINGLE, name: 'peering_link' },
    { type: FIELD_TYPES.SINGLE, name: 'as_number' },
    { type: FIELD_TYPES.SINGLE, name: 'with_same_name' },
  ],
};
const peeringGroup = {
  formName: {
    update: 'updatePeeringGroup',
  },
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    { type: FIELD_TYPES.SINGLE, name: 'name' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'dependencies' },
  ],
};

const opticalNode = {
  formName: {
    create: 'createOpticalNode',
    update: 'updateOpticalNode',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...RACK_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'rack_back' },
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.OBJECT, name: 'type' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};

const ODF = {
  formName: {
    create: 'createODF',
    update: 'updateODF',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...RACK_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'rack_back' },
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};

const opticalLink = {
  formName: {
    create: 'createOpticalLink',
    update: 'updateOpticalLink',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.OBJECT, name: 'type' },
    { type: FIELD_TYPES.OBJECT, name: 'interface_type' },
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};

const opticalMultiplexSection = {
  formName: {
    create: 'createOpticalMultiplexSection',
    update: 'updateOpticalMultiplexSection',
  },
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'dependencies' },
  ],
};

const opticalPath = {
  formName: {
    create: 'createOpticalPath',
    update: 'updateOpticalPath',
  },
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.OBJECT, name: 'framing' },
    { type: FIELD_TYPES.OBJECT, name: 'capacity' },
    { type: FIELD_TYPES.SINGLE, name: 'wavelength' },
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
  ],
};

const opticalFilter = {
  formName: {
    create: 'createOpticalFilter',
    update: 'updateOpticalFilter',
  },
  dispatchPropertiesListCreate: ['notify', 'modal', 'portDetails'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm', 'portDetails'],
  fields: [
    ...BASIC_INFO,
    ...RACK_INFO,
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.SINGLE, name: 'max_number_of_ports' },
    { type: FIELD_TYPES.ARRAY_LIST, name: 'ports' },
  ],
};

const rack = {
  formName: {
    create: 'createRack',
    update: 'updateRack',
  },
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'height' },
    { type: FIELD_TYPES.SINGLE, name: 'width' },
    { type: FIELD_TYPES.SINGLE, name: 'depth' },
    { type: FIELD_TYPES.SINGLE, name: 'rack_units' },
  ],
};

const room = {
  formName: {
    create: 'createRoom',
    update: 'updateRoom',
  },
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [...BASIC_INFO],
};

const site = {
  formName: {
    create: 'createSite',
    update: 'updateSite',
  },
  dispatchPropertiesListCreate: ['notify', 'modal'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'modal', 'confirm'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.SINGLE, name: 'url' },
    { type: FIELD_TYPES.SINGLE, name: 'area' },
    { type: FIELD_TYPES.SINGLE, name: 'latitude' },
    { type: FIELD_TYPES.SINGLE, name: 'longitude' },
  ],
};

const service = {
  formName: {
    create: 'createService',
    update: 'updateService',
  },
  dispatchPropertiesListCreate: ['notify'],
  dispatchPropertiesListUpdate: ['notify', 'breadcrumbs', 'confirm'],
  fields: [
    ...BASIC_INFO,
    { type: FIELD_TYPES.ID_OBJECT, name: 'service_type' },
    { type: FIELD_TYPES.OBJECT, name: 'operational_state' },
    { type: FIELD_TYPES.SINGLE, name: 'decommissioned_date' },
    { type: FIELD_TYPES.ID_OBJECT, name: 'provider' },
    ...RELATION_GROUP_INFO,
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
  router,
  peeringPartner,
  peeringGroup,
  opticalNode,
  ODF,
  opticalLink,
  opticalMultiplexSection,
  opticalPath,
  opticalFilter,
  rack,
  room,
  site,
  service,
};
