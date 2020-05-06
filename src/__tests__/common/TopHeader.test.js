import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { TopHeader } from '../../components/TopHeader';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

let TopHeaderWrapper;
let TopHeaderComponent;

const defaultProps = {
  t: jest.fn((t) => t),
  view_community: true,
  view_services: true,
  view_network: true,
  landing_page: 'community',
};

const historyMock = {
  push: jest.fn(),
  goBack: jest.fn(),
  location: {
    pathname: '/dashboard',
  },
  createHref: jest.fn(),
  listen: () => {},
};

const CreateTopHeaderWrapper = (props) => {
  const allProps = { ...defaultProps, ...props };
  const store = mockStore({
    view_community: true,
    view_services: true,
    view_network: true,
    landing_page: true,
  });
  return (
    <Provider history={historyMock} store={store}>
      <Router history={historyMock}>
        <TopHeader {...allProps} />
      </Router>
    </Provider>
  );
};

const mountTopHeaderWrapper = (props) => mount(<CreateTopHeaderWrapper {...props} />);

beforeEach(() => {
  jest.clearAllMocks();
  TopHeaderWrapper = mountTopHeaderWrapper();
  TopHeaderComponent = TopHeaderWrapper.find('TopHeader');
});
afterEach(() => {
  TopHeaderWrapper.unmount();
});

describe('Some Component', () => {
  it('Renders correctly', () => {
    expect(toJson(TopHeaderWrapper)).toMatchSnapshot();
    expect(TopHeaderComponent.find('nav.top-header')).toHaveLength(1);
  });
});
describe('Elements', () => {
  it('Brand', () => {
    const brand = TopHeaderComponent.find('a.top-header__brand');
    const imgBrand = brand.find('img');
    expect(brand).toHaveLength(1);
    expect(imgBrand).toHaveLength(1);
    expect(imgBrand.prop('src').default).toBe('logo.svg');
    expect(imgBrand.prop('img-fluid')).toBe('true');
  });
  it('Navbar', () => {
    const navBarPaths = TopHeaderComponent.find('div.top-header__nav-paths');
    const links = navBarPaths.find('a');
    const homeLink = links.find('[children="header.main-menu.home"]');
    const communityLink = links.find('[children="header.main-menu.community"]');
    const networkLink = links.find('[children="header.main-menu.network"]');
    expect(navBarPaths).toHaveLength(1);
    expect(links).toHaveLength(3);
    expect(homeLink).toHaveLength(1);
    expect(communityLink).toHaveLength(1);
    expect(networkLink).toHaveLength(1);
    expect(homeLink.prop('className').match('active')).toHaveLength(1);
  });
  it('Persona area', () => {
    const editProfileButton = TopHeaderComponent.find('div.top-header__user-block__profile');
    const link = editProfileButton.find('a');
    const linkIcon = link.find('img');
    expect(editProfileButton).toHaveLength(1);
    expect(link).toHaveLength(1);
    expect(linkIcon).toHaveLength(1);
    expect(linkIcon.prop('src')).toBe('profile.png');
  });
  it('Logout Button', () => {
    const logoutWrapper = TopHeaderComponent.find('div.top-header__user-block__logout');
    expect(logoutWrapper).toHaveLength(1);
    expect(logoutWrapper.find('Logout')).toHaveLength(1);
  });
});