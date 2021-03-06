import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import graphql from 'babel-plugin-relay/macro';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import renameKeys from 'rename-keys';

import environment from '../../createRelayEnvironment';
import CONFIG from '../../config';
import CreateOrganization from './CreateOrganization';
import OrganizationDetailsContainer from '../../containers/organization/OrganizationDetails';
import OrganizationListContainer from '../../containers/organization/OrganizationList';
import { isEmpty } from '../../utils';
import { isBrowser, isMobile } from 'react-device-detect';
import LateralSliderMenu from '../../components/LateralSliderMenu';
import FilterColumnsContainer from '../../containers/FilterColumns';
import FilterRowsBlock from '../FilterRowsBlock';
import CustomQueryRenderer from '../../components/CustomQueryRenderer';

const { ITEMS_PER_PAGE } = CONFIG;

//mock - This should be returned to the backend in the future.
const defaultColumns = [
  { name: 'Name', value: 'name', filter: 'order' },
  { name: 'Organization ID', value: 'organization_id', filter: 'order' },
  { name: 'Type', value: 'type', filter: 'order-filter' },
  { name: 'Affiliation', value: 'affiliation' },
  { name: 'Parent Organization ID', value: 'parent_organization_id' },
];

const SearchOrganizationAllQuery = graphql`
  query SearchOrganizationAllQuery($count: Int!, $filter: OrganizationFilter, $orderBy: OrganizationOrderBy) {
    ...OrganizationList_organizations @arguments(count: $count, filter: $filter, orderBy: $orderBy)
    ...OrganizationList_organization_types
  }
`;

const MODEL_NAME = 'organization';

class SearchOrganization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countList: ITEMS_PER_PAGE,
      filterValueText: '',
      filterValue: {},
      filterColumnValue: {},
      filterDateType: 'created',
      filterDateFrom: '',
      filterDateTo: '',
      filterDate: {},
      orderBy: { orderBy: 'handle_id_DESC' },
      openMobileFiltersPanel: false,
    };
    if (isMobile) {
      props.showHideColumn('name', true, MODEL_NAME);
    }
  }

  // save in the state the column orderby
  handleColumnChangeOrderBy = (event, orderBy) => {
    if (event.target.checked) {
      orderBy = orderBy.concat('_ASC');
    } else {
      orderBy = orderBy.concat('_DESC');
    }

    this.setState({ orderBy: { orderBy: orderBy } });
  };

  // update state for order filter columns
  handleChangeOrderFilterColumns = (orderFilter) => {
    if (orderFilter.orderBy) {
      this.setState({ orderBy: { orderBy: orderFilter.orderBy } });
    }
    if (orderFilter.filters.length > 0) {
      this.setState({
        filterColumnValue: { [orderFilter.column + '_in']: orderFilter.filters },
      });
    } else {
      this.setState({ filterColumnValue: {} });
    }
  };

  //save in the state the number of pages shown
  handleOnChangeCount = (count) => {
    this.setState({ countList: this.state.countList + count });
  };

  // save in the state the filter box
  // these filters cannot be generalized by backend implementation
  handleOnChangeFilter = (filterValue) => {
    this.setState({
      filterValueText: filterValue,
      filterValue: [
        { name_contains: filterValue },
        { organization_id_contains: filterValue },
        { type_contains: filterValue },
      ],
    });
  };

  // save in the state the orderby
  handleOnChangeOrderBy = (orderBy) => {
    this.setState({ orderBy: { orderBy: orderBy } });
  };

  handleDateTo = (dateTo) => {
    this.setState({ filterDateTo: dateTo });
  };

  handleDateFrom = (dateFrom) => {
    this.setState({ filterDateFrom: dateFrom });
  };

  // reset the date status by clicking on the button
  handleResetDate = (from, to) => {
    this.setState({ filterDateFrom: from, filterDateto: to, filterDate: {} });
  };

  // changes the keys of the state object between created or modified
  changeFilterDateType = (event) => {
    this.setState({ filterDateType: event.target.value });
    let newfilterDate = renameKeys(this.state.filterDate, (key) => {
      return key.replace(this.state.filterDateType, event.target.value);
    });
    this.setState({ filterDate: { ...newfilterDate } });
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // updates the component if you see changes in the date status
    const filterDateType = this.state.filterDateType;
    if (nextState.filterDateFrom !== undefined && this.state.filterDateFrom !== nextState.filterDateFrom) {
      this.setState({
        filterDate: { ...this.state.filterDate, [filterDateType + '_gte']: nextState.filterDateFrom },
      });
    }
    if (nextState.filterDateTo !== undefined && this.state.filterDateTo !== nextState.filterDateTo) {
      this.setState({
        filterDate: { ...this.state.filterDate, [filterDateType + '_lte']: nextState.filterDateTo },
      });
    }
  }

  // mount the filter object to pass it to the QueryRender
  getFilters = () => {
    const filterArrayAND = [];
    let filterArrayOR = [];
    let filters = {};

    if (!isEmpty(this.state.filterDate)) {
      filterArrayAND.push(this.state.filterDate);
    }

    if (!isEmpty(this.state.filterColumnValue)) {
      filterArrayAND.push(this.state.filterColumnValue);
    }

    if (!isEmpty(this.state.filterValue)) {
      filterArrayOR = [...filterArrayOR, ...this.state.filterValue];
    }

    if (filterArrayAND.length > 0) filters.AND = filterArrayAND;
    if (filterArrayOR.length > 0) filters.OR = filterArrayOR;
    return filters;
  };

  renderColumnsFilter() {
    return (
      <FilterColumnsContainer
        columns={defaultColumns}
        type="hidden-col"
        model={MODEL_NAME}
        classContainer="filter-columns-internal-menu"
      ></FilterColumnsContainer>
    );
  }

  renderList() {
    return (
      <Row id="table_test" className="mt-3">
        <Col>
          <CustomQueryRenderer
            environment={environment}
            query={SearchOrganizationAllQuery}
            variables={{
              count: ITEMS_PER_PAGE,
              ...this.state.orderBy,
              filter: this.getFilters(),
            }}
            errorMessage={this.props.t('general/error')}
            mainClass=""
            componentToRender={{
              Component: OrganizationListContainer,
              mainProps: ['organizations', 'organization_types'],
              componentProps: {
                changeCount: this.handleOnChangeCount,
                columnChangeOrderBy: this.handleColumnChangeOrderBy,
                orderBy: this.state.orderBy.orderBy,
                changeOrderFilterColumns: this.handleChangeOrderFilterColumns,
                filterColumn: this.state.filterColumnValue.type_in,
                defaultColumns: defaultColumns,
                clickInMobileShowMenu: () => {
                  this.setState({
                    openMobileFiltersPanel: !this.state.openMobileFiltersPanel,
                  });
                },
              },
            }}
          />
        </Col>
      </Row>
    );
  }

  renderFilterBox() {
    return (
      <FilterRowsBlock
        initialTextValue={this.state.filterValueText}
        handleOnChangeFilter={this.handleOnChangeFilter}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        filterDateType={this.state.filterDateType}
        handleDateTo={this.handleDateTo}
        handleDateFrom={this.handleDateFrom}
        handleResetDate={this.handleResetDate}
        changeFilterDateType={this.changeFilterDateType}
      ></FilterRowsBlock>
    );
  }

  renderLateralMenuWithFiltersBox() {
    const { t } = this.props;
    return (
      <LateralSliderMenu
        open={this.state.openMobileFiltersPanel}
        clickInClose={() => this.setState({ openMobileFiltersPanel: false })}
        header={{
          iconClass: 'icon-filter',
          text: t('filter.mobile.title'),
        }}
        footer={{
          accept: {
            onClick: () => {
              this.setState({ openMobileFiltersPanel: false });
            },
            text: t('actions/accept'),
          },
        }}
      >
        {this.renderFilterBox()}
        <Col>
          <Row className="justify-content-center">{this.renderColumnsFilter()}</Row>
          <hr />
        </Col>
      </LateralSliderMenu>
    );
  }

  render() {
    return (
      <section className="mt-3">
        <Switch>
          <Route
            exact
            path="/community/organizations"
            render={() => (
              <>
                {isBrowser ? this.renderFilterBox() : this.renderLateralMenuWithFiltersBox()}
                {this.renderList()}
              </>
            )}
          />
          <Route path="/community/organizations/create" component={CreateOrganization} />
          <Route path="/community/organizations/:organizationId" component={OrganizationDetailsContainer} />
        </Switch>
      </section>
    );
  }
}

export default withTranslation()(withRouter(SearchOrganization));
