import React from 'react';
import { withTranslation } from 'react-i18next';
import { Col, Nav } from 'react-bootstrap';
import ReactSVG from 'react-svg';
import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { path } from '../Routes';

import '../style/SideNav.scss';
import { NETWORK_ORGANIZATIONS, NETWORK_EQUIPMENT } from '../utils/constants';

class SideNavNetwork extends React.Component {
  NETWORK_ORGANIZATIONS_ROUTES = ['customers', 'end-users', 'providers', 'site-owners'];
  NETWORK_EQUIPMENT_ROUTES = ['cables', 'ports', 'switches'];
  MENU_DATA = [
    {
      header: {
        name: NETWORK_ORGANIZATIONS,
        icon: 'organization-icon.svg',
        i18nText: 'community.sub-menu.organizations',
      },
      items: [
        { path: 'customers', i18nText: 'network.sub-menu.organizations/customers' },
        { path: 'end-users', i18nText: 'network.sub-menu.organizations/end-users' },
        { path: 'providers', i18nText: 'network.sub-menu.organizations/providers' },
        { path: 'site-owners', i18nText: 'network.sub-menu.organizations/site-owners' },
      ],
    },
    {
      header: {
        name: NETWORK_EQUIPMENT,
        icon: 'equipment-icon.svg',
        i18nText: 'network.sub-menu.equipment',
      },
      items: [
        { path: 'cables', i18nText: 'network.sub-menu.equipment/cables' },
        { path: 'ports', i18nText: 'network.sub-menu.equipment/ports' },
        { path: 'switches', i18nText: 'network.sub-menu.equipment/switches' },
      ],
    },
  ];

  matchUrl = () => {
    const [, blockPath, entityPath] = this.props.location.pathname.split('/');
    if (
      blockPath === 'network' &&
      (entityPath === undefined || this.NETWORK_ORGANIZATIONS_ROUTES.includes(entityPath))
    ) {
      return 'network-organizations';
    } else if (this.NETWORK_EQUIPMENT_ROUTES.includes(entityPath)) {
      return 'network-equipment';
    }
    // else if (this.props.location.pathname.includes("locations")) {
    //     return "locations";
    // }
  };

  renderAccordionItem(idPath, icon, i18nText, items) {
    const { t, match } = this.props;
    return (
      <AccordionItem uuid={idPath} key={idPath}>
        <AccordionItemState>
          {({ expanded }) => (
            <>
              <AccordionItemHeading>
                <AccordionItemButton className="accordion__button with-arrow">
                  <ReactSVG src={require(`../static/img/${icon}`)} wrapper="span" />
                  {t(i18nText)}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <Nav className="flex-column">
                  {items.map((item, itemIndex) => {
                    return (
                      <Nav.Link
                        key={itemIndex}
                        as={NavLink}
                        activeClassName="active"
                        to={`${path(match.url)}/${item.path}`}
                      >
                        {t(item.i18nText)}
                      </Nav.Link>
                    );
                  })}
                </Nav>
              </AccordionItemPanel>
            </>
          )}
        </AccordionItemState>
      </AccordionItem>
    );
  }

  render() {
    return (
      <Col sm={2} className="pl-0">
        <Nav className="flex-column side-nav">
          <Accordion preExpanded={[this.matchUrl()]} className="accordion">
            {this.MENU_DATA.map((data) => {
              const { header, items } = data;
              return this.renderAccordionItem(header.name, header.icon, header.i18nText, items);
            })}
          </Accordion>
        </Nav>
      </Col>
    );
  }
}

export default withTranslation()(withRouter(SideNavNetwork));
