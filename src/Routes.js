import formattedServicesData from './components/service/serviceListData';

const servicesRoutes = formattedServicesData.reduce((acc, curr) => {
  acc[`/network/${curr.path}`] = curr.originalName;
  return acc;
}, {});

const Routes = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/network': 'Network',
  '/network/physical': 'Physical',
  '/network/physical/cables': 'Cables',
  '/network/physical/external-equipment': 'External equipment',
  '/network/physical/odfs': 'Odfs',
  '/network/physical/optical-nodes': 'Optical nodes',
  '/network/physical/routers': 'Routers',
  '/network/logical': 'Logical',
  '/network/logical/hosts': 'Hosts',
  '/network/logical/optical-paths': 'Optical paths',
  '/network/locations': 'Locations',
  '/network/location-racks': 'Racks',
  '/network/location-rooms': 'Rooms',
  '/network/location-sites': 'Sites',
  '/network/providers': 'Providers',
  '/network/providers/create': 'Create Provider',
  '/network/customers': 'Customers',
  '/network/customers/create': 'Create Customer',
  '/network/end-users': 'End users',
  '/network/end-users/create': 'Create End User',
  '/network/site-owners': 'Site Owners',
  '/network/site-owners/create': 'Create Site Owner',
  '/network/cables': 'Cables',
  '/network/cables/create': 'Create Cable',
  '/network/ports': 'Ports',
  '/network/ports/create': 'Create Port',
  '/network/switches': 'Switches',
  '/network/switches/create': 'Create Switch',
  '/network/firewalls': 'Firewalls',
  '/network/routers': 'Routers',
  '/network/routers/create': 'Create Router',
  '/network/external-equipments': 'External Equipments',
  '/network/external-equipments/create': 'Create External Equipment',
  '/network/hosts': 'Hosts',
  '/network/hosts/create': 'Create Host',
  '/network/peering-partners': 'Peering Partner',
  '/network/peering-groups': 'Peering Group',
  '/network/optical-nodes': 'Optical Nodes',
  '/network/optical-nodes/create': 'Create Optical Node',
  '/network/odfs': 'ODFs',
  '/network/odfs/create': 'Create ODF',
  '/network/optical-links': 'Optical Links',
  '/network/optical-links/create': 'Create Optical Link',
  '/network/optical-multiplex-sections': 'Optical Multiplex Sections',
  '/network/optical-multiplex-sections/create': 'Create Optical Multiplex Section',
  '/network/optical-paths': 'Optical Path',
  '/network/optical-paths/create': 'Create Optical Path',
  '/network/optical-filters': 'Optical Filter',
  '/network/optical-filters/create': 'Create Optical Filter',
  '/network/location-site': 'Location Site',
  '/network/location-site/create': 'Create Location Site',
  '/community': 'Community',
  '/community/organizations': 'Organizations',
  '/community/organizations/create': 'Create Organization',
  '/community/groups': 'Groups',
  '/community/groups/create': 'Create Group',
  '/community/contacts': 'Contacts',
  '/community/contacts/create': 'Create Contact',
  '/contracts': 'Contracts',
  '/personal-area': 'Personal Area',
  '/personal-area/profile-settings': 'Profile & settings',
  ...servicesRoutes,
};

export const path = (url) => {
  const fixedPath = url.endsWith('/') ? path(url.substring(0, url.length - 1)) : url;

  return fixedPath;
};

export default Routes;
