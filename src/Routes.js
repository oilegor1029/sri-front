const Routes = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/network': 'Network',
  '/network/physical': 'Physical',
  '/network/physical/cables': 'Cables',
  '/network/physical/external-equipment': 'External equipment',
  '/network/physical/firewalls': 'Firewalls',
  '/network/physical/hosts': 'Hosts',
  '/network/physical/odfs': 'Odfs',
  '/network/physical/optical-nodes': 'Optical nodes',
  '/network/physical/routers': 'Routers',
  '/network/logical': 'Logical',
  '/network/logical/hosts': 'Hosts',
  '/network/logical/optical-links': 'Optical links',
  '/network/logical/optical-multiplex': 'Optical multiplex',
  '/network/logical/optical-paths': 'Optical paths',
  '/network/locations': 'Locations',
  '/network/locations/racks': 'Racks',
  '/network/locations/sites': 'Sites',
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
};

export const path = (url) => {
  const fixedPath = url.endsWith('/') ? path(url.substring(0, url.length - 1)) : url;

  return fixedPath;
};

export default Routes;
