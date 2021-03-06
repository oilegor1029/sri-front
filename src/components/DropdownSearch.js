import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import Downshift from 'downshift';
import { withTranslation } from 'react-i18next';
import { Menu, Input, Item, css, itemToString } from './DropdownSearchItems';

import { fetchQuery } from 'relay-runtime';

import environment from '../createRelayEnvironment';

import { debounce } from '../utils';
import { MILLISECONDS_TO_WAIT_REQUEST_AUTOCOMPLETE } from '../utils/constants';

import '../style/Downshift.scss';

const MIN_CHAR_TO_FIND = 2;

const DropdownSearchAllContactsQuery = graphql`
  query DropdownSearchAllContactsQuery($filter: ContactFilter) {
    contacts(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllProvidersQuery = graphql`
  query DropdownSearchAllProvidersQuery($filter: ProviderFilter) {
    providers(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllCustomersQuery = graphql`
  query DropdownSearchAllCustomersQuery($filter: CustomerFilter) {
    customers(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllEndUsersQuery = graphql`
  query DropdownSearchAllEndUsersQuery($filter: EndUserFilter) {
    endUsers(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllSiteOwnersQuery = graphql`
  query DropdownSearchAllSiteOwnersQuery($filter: SiteOwnerFilter) {
    siteOwners(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllCablesQuery = graphql`
  query DropdownSearchAllCablesQuery($filter: CableFilter) {
    cables(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchAllPortsQuery = graphql`
  query DropdownSearchAllPortsQuery($filter: PortFilter) {
    ports(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const DropdownSearchTypeHeadPortsQuery = graphql`
  query DropdownSearchTypeHeadPortsQuery($filter: GenericFilter) {
    search_port(filter: $filter) {
      edges {
        node {
          id
          name
          type: port_type {
            id
            name
            value
          }
        }
      }
    }
  }
`;

const DropdownSearchAllSwitchsQuery = graphql`
  query DropdownSearchAllSwitchsQuery($filter: SwitchFilter) {
    switchs(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllFirewallsQuery = graphql`
  query DropdownSearchAllFirewallsQuery($filter: FirewallFilter) {
    firewalls(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllExternalEquipmentsQuery = graphql`
  query DropdownSearchAllExternalEquipmentsQuery($filter: ExternalEquipmentFilter) {
    externalEquipments(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllHostUsersQuery = graphql`
  query DropdownSearchAllHostUsersQuery($filter: HostUserFilter) {
    hostUsers(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllOpticalFiltersQuery = graphql`
  query DropdownSearchAllOpticalFiltersQuery($filter: OpticalFilterFilter) {
    opticalFilters(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllOpticalNodesQuery = graphql`
  query DropdownSearchAllOpticalNodesQuery($filter: OpticalNodeFilter) {
    opticalNodes(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllRoutersQuery = graphql`
  query DropdownSearchAllRoutersQuery($filter: RouterFilter) {
    routers(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownSearchAllODFsQuery = graphql`
  query DropdownSearchAllODFsQuery($filter: ODFFilter) {
    odfs(filter: $filter) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

class DropdownSearch extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.LOADING_VALUE = [{ id: '', name: t('actions/loading') }];

    this.NO_MATCHES_RESULT = [{ id: '', name: t('search-filter.no-matches') }];

    this.state = {
      filterValue: '',
      allItems: [],
    };
  }
  getQueryByModel(model) {
    let queryModel = {
      modelName: model,
    };
    switch (model) {
      case 'contacts':
        queryModel.query = DropdownSearchAllContactsQuery;
        break;
      case 'providers':
        queryModel.query = DropdownSearchAllProvidersQuery;
        break;
      case 'customers':
        queryModel.query = DropdownSearchAllCustomersQuery;
        break;
      case 'endUsers':
        queryModel.query = DropdownSearchAllEndUsersQuery;
        break;
      case 'siteOwners':
        queryModel.query = DropdownSearchAllSiteOwnersQuery;
        break;
      case 'cables':
        queryModel.query = DropdownSearchAllCablesQuery;
        break;
      case 'ports':
        queryModel.query = DropdownSearchAllPortsQuery;
        break;
      case 'switchs':
        queryModel.query = DropdownSearchAllSwitchsQuery;
        break;
      case 'firewalls':
        queryModel.query = DropdownSearchAllFirewallsQuery;
        break;
      case 'externalEquipments':
        queryModel.query = DropdownSearchAllExternalEquipmentsQuery;
        break;
      case 'ports-type-head':
        queryModel.query = DropdownSearchTypeHeadPortsQuery;
        queryModel.modelName = 'search_port';
        break;
      case 'Patch':
      case 'Power Cable':
      case 'Dark Fiber':
        queryModel.query = DropdownSearchAllCablesQuery;
        queryModel.typeFilter = { cable_type: model };
        queryModel.modelName = 'cables';
        break;
      case 'hostUsers':
        queryModel.query = DropdownSearchAllHostUsersQuery;
        break;
      case 'opticalFilters':
        queryModel.query = DropdownSearchAllOpticalFiltersQuery;
        break;
      case 'opticalNodes':
        queryModel.query = DropdownSearchAllOpticalNodesQuery;
        break;
      case 'routers':
        queryModel.query = DropdownSearchAllRoutersQuery;
        break;
      case 'odfs':
        queryModel.query = DropdownSearchAllODFsQuery;
        break;
      default:
        queryModel.query = DropdownSearchAllContactsQuery;
        break;
    }
    return queryModel;
  }

  getItems = debounce((filter) => {
    const { modelName, query, typeFilter } = this.getQueryByModel(this.props.model);
    const { skipElements, model } = this.props;
    let variables = {
      filter: {},
    };
    if (model === 'ports-type-head') {
      variables.filter.query = filter;
    } else {
      variables.filter = { AND: [{ name_contains: filter }] };

      if (typeFilter) {
        variables.filter.AND.push(typeFilter);
      }

      if (skipElements && skipElements.length) {
        variables.filter.AND.push({
          id_not_in: skipElements,
        });
      }
    }

    if (filter.length > MIN_CHAR_TO_FIND) {
      this.setState({ filterValue: filter, allItems: this.LOADING_VALUE });
      fetchQuery(environment, query, variables).then((data) => {
        let newData = data[modelName].edges.map((edge) => edge.node);
        if (newData.length === 0) {
          newData = this.NO_MATCHES_RESULT;
        }
        this.setState({ filterValue: filter, allItems: newData });
      });
    } else {
      this.setState({ filterValue: filter, allItems: [] });
    }
  }, MILLISECONDS_TO_WAIT_REQUEST_AUTOCOMPLETE);

  handleSelectOption = (selection) => {
    this.props.selection(selection);
  };

  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Downshift
          onChange={(selection) => {
            this.handleSelectOption(selection);
          }}
          itemToString={itemToString}
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            getItemProps,
            isOpen,
            clearSelection,
            selectedItem,
            inputValue,
            highlightedIndex,
          }) => (
            <div {...css({ margin: 'auto' })} className="downshift">
              <div {...css({ position: 'relative' })}>
                <Input
                  disabled={this.props.disabled}
                  {...getInputProps({
                    isOpen,
                    placeholder: this.props.placeholder,
                    onChange: (event) => {
                      this.getItems(event.target.value);
                    },
                  })}
                />
              </div>
              <div {...css({ position: 'relative' })}>
                <Menu {...getMenuProps({ isOpen })} onClick={clearSelection}>
                  {isOpen
                    ? this.state.allItems.map((item, index) => (
                        <Item
                          key={item.id}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item,
                          })}
                        >
                          {itemToString(item)}
                        </Item>
                      ))
                    : null}
                </Menu>
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default withTranslation()(DropdownSearch);
