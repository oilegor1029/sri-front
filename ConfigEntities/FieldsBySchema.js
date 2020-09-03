const CABLE_FIELDS = require('./entities/CableFields');
const SWITCH_FIELDS = require('./entities/SwitchFields');
const ROUTER_FIELDS = require('./entities/RouterFields');

module.exports = [
  {
    entity: 'Cable',
    files: ['src/queries/cable/CableDetailsQuery', 'src/components/cable/CableUpdateForm'],
    reference: '___CABLE_FIELDS___',
    queries: {
      common: {
        fields: [...CABLE_FIELDS.CABLE_COMMON_FIELDS],
      },
      sunet: {
        fields: [...CABLE_FIELDS.CABLE_COMMON_FIELDS, ...CABLE_FIELDS.CABLE_SUNET],
      },
      nordunet: {
        fields: [...CABLE_FIELDS.CABLE_COMMON_FIELDS, ...CABLE_FIELDS.CABLE_NORDUNI],
      },
    },
  },
  {
    entity: 'Switch',
    files: ['src/queries/switch/SwitchDetailsQuery', 'src/components/switch/SwitchUpdateForm'],
    reference: '___SWITCH_FIELDS___',
    queries: {
      common: {
        fields: [...SWITCH_FIELDS.SWITCH_COMMON_FIELDS],
      },
      sunet: {
        fields: [...SWITCH_FIELDS.SWITCH_COMMON_FIELDS, ...SWITCH_FIELDS.SWITCH_SUNET],
      },
      nordunet: {
        fields: [...SWITCH_FIELDS.SWITCH_COMMON_FIELDS, ...SWITCH_FIELDS.SWITCH_NORDUNI],
      },
    },
  },
  {
    entity: 'Router',
    files: ['src/queries/router/RouterDetailsQuery', 'src/components/router/RouterUpdateForm'],
    reference: '___ROUTER_FIELDS___',
    queries: {
      common: {
        fields: [...ROUTER_FIELDS.ROUTER_COMMON_FIELDS],
      },
      sunet: {
        fields: [...ROUTER_FIELDS.ROUTER_COMMON_FIELDS, ...ROUTER_FIELDS.ROUTER_SUNET],
      },
      nordunet: {
        fields: [...ROUTER_FIELDS.ROUTER_COMMON_FIELDS, ...ROUTER_FIELDS.ROUTER_NORDUNI],
      },
    },
  },
];
