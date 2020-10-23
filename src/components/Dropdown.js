import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Field } from 'redux-form';
import Select from 'react-select';

import FieldSelect from './FieldSelect';

import environment from '../createRelayEnvironment';

const DropdownQuery = graphql`
  query DropdownQuery($name: String!) {
    getChoicesForDropdown(name: $name) {
      name
      value
    }
  }
`;

const DropdownOrganizationsAllQuery = graphql`
  query DropdownOrganizationsAllQuery {
    all_organizations {
      id
      name
      organization_id
    }
  }
`;

const DropdownProvidersAllQuery = graphql`
  query DropdownProvidersAllQuery {
    all_providers {
      id
      name
    }
  }
`;
const DropdownGroupsAllQuery = graphql`
  query DropdownGroupsAllQuery {
    all_groups: getPlainGroups {
      id
      name
    }
  }
`;
const DropdownRolesQuery = graphql`
  query DropdownRolesQuery {
    roles(orderBy: name_ASC) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const DropdownRolesGroupDefaultQuery = graphql`
  query DropdownRolesGroupDefaultQuery {
    getRolesFromRoleGroup {
      id
      name
    }
  }
`;

const DropdownPhysicalTypesQuery = graphql`
  query DropdownPhysicalTypesQuery {
    getTypesForMetatype(metatype: Physical) {
      name: type_name
      value: connection_name
      getDetailsMethodName: byid_name
      all_name
    }
  }
`;

const DropdownSwitchTypesQuery = graphql`
  query DropdownSwitchTypesQuery {
    getSwitchTypes {
      value: id
      name
    }
  }
`;

const DropdownOwnersQuery = graphql`
  query DropdownOwnersQuery {
    getHostOwnerTypes {
      name: type_name
      value: connection_name
      getDetailsMethodName: byid_name
      all_name
    }
  }
`;

class Dropdown extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    model: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    emptyLabel: PropTypes.string,
    defaultValue: PropTypes.string,
  };
  getQueryByModel(model) {
    let queryModel;
    switch (model) {
      case 'organization':
        queryModel = DropdownOrganizationsAllQuery;
        break;
      case 'provider':
        queryModel = DropdownProvidersAllQuery;
        break;
      case 'group':
        queryModel = DropdownGroupsAllQuery;
        break;
      case 'roles':
        queryModel = DropdownRolesQuery;
        break;
      case 'default_roles':
        queryModel = DropdownRolesGroupDefaultQuery;
        break;
      case 'physical_types':
        queryModel = DropdownPhysicalTypesQuery;
        break;
      case 'owners_types':
        queryModel = DropdownOwnersQuery;
        break;
      case 'switch_types':
        queryModel = DropdownSwitchTypesQuery;
        break;
      default:
        queryModel = DropdownQuery;
        break;
    }
    return queryModel;
  }

  getCustomLabel(element) {
    const { labelElementsArray } = this.props;
    return labelElementsArray.map((e) => element[e]).join(' - ');
  }

  getFormattedDataList(dataList) {
    const { valueField, model } = this.props;
    let list;
    if (model === 'roles') {
      list = dataList.edges.map((e) => ({ id: e.node.id, name: e.node.name }));
    } else {
      list = [...dataList];
    }
    return list.map((element) => {
      return {
        value: element[valueField],
        label: this.getCustomLabel(element),
        id: element.id,
        data: element,
      };
    });
  }

  getInitialValue(objectValue) {
    const { valueField } = this.props;
    const { id } = objectValue;
    return {
      value: objectValue[valueField],
      label: this.getCustomLabel(objectValue),
      id,
    };
  }

  // for real backend dropdowns
  renderOptions = (options) => {
    return options.map((option) => {
      return (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      );
    });
  };
  // dropdwons custom from a query
  renderOptionsModel = (options) => {
    return options.edges.map((option) => {
      return (
        <option key={option.node.id} value={option.node.id}>
          {option.node.name}
        </option>
      );
    });
  };
  // dropdowns optimized by the backend to improve performance
  renderOptionsModelOptimized = (options) => {
    return options.map((option) => {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      );
    });
  };

  renderComboSelect(dataList) {
    const { currentValue, nameDataInsideRequest } = this.props;
    const formattedDataList = this.getFormattedDataList(dataList[nameDataInsideRequest]);
    const currentValueFromList =
      nameDataInsideRequest === 'roles'
        ? formattedDataList.filter((el) => el.value && currentValue.map((cv) => cv.id).includes(el.value))
        : formattedDataList.find((el) => el.value && el.value === currentValue);
    return (
      <Select
        isClearable
        isMulti={nameDataInsideRequest === 'roles'}
        value={currentValueFromList}
        onChange={(newValue) => {
          let data;
          if (nameDataInsideRequest === 'roles') {
            data = newValue ? newValue.map((e) => e.data) : [];
          } else {
            data = newValue ? newValue.data : null;
          }
          this.props.onChange(data);
        }}
        options={formattedDataList}
        placeholder={this.props.placeholder}
        className="combo-select-container"
        classNamePrefix="combo-select"
      />
    );
  }

  renderField(options) {
    return (
      <Field
        className={this.props.className}
        component={FieldSelect}
        onChange={(e) => {
          if (this.props.model === 'physical_types' || this.props.model === 'owners_types') {
            this.props.onChange(options.find((o) => o.value === e.target.value));
          } else {
            this.props.onChange(e.target);
          }
        }}
        name={this.props.name}
        value={this.props.defaultValue || ''}
      >
        {this.props.emptyLabel && (
          <option value="" default>
            {this.props.emptyLabel}
          </option>
        )}
        {this.props.model === 'organization' && this.renderOptionsModelOptimized(options)}
        {(this.props.model === 'roles' || this.props.model === 'default_roles') && this.renderOptionsModel(options)}
        {(this.props.model === 'physical_types' || this.props.model === 'owners_types') && this.renderOptions(options)}
        {this.props.model === 'switch_types' && this.renderOptions(options)}
        {this.props.model === undefined && this.renderOptions(options)}
      </Field>
    );
  }

  renderComboSelectDefault() {
    return (
      <Select
        value={this.props.objectCurrentValue ? this.getInitialValue(this.props.objectCurrentValue) : undefined}
        options={[]}
        placeholder={this.props.placeholder}
        className="combo-select-container"
        classNamePrefix="combo-select"
      />
    );
  }

  renderDefaultSelect() {
    return (
      <select className={this.props.className}>
        <option value="">{this.props.emptyLabel}</option>
      </select>
    );
  }

  render() {
    const { t, type } = this.props;
    let dropdownQuery = this.getQueryByModel(this.props.model);
    const variables =
      this.props.model === undefined
        ? {
            name: this.props.type,
          }
        : null;
    return (
      <Form.Group className="d-inline">
        {this.props.label && <Form.Label>{this.props.label}</Form.Label>}
        <QueryRenderer
          environment={environment}
          query={dropdownQuery}
          variables={variables}
          render={({ error, props }) => {
            if (error) {
              return <div>{t('general/error')}</div>;
            } else if (props) {
              const options = props[Object.keys(props)[0]];
              if (type === 'combo_list') {
                return this.renderComboSelect(props);
              } else {
                return this.renderField(options);
              }
            }
            return type === 'combo_list' ? this.renderComboSelectDefault() : this.renderDefaultSelect();
          }}
        />
      </Form.Group>
    );
  }
}

export default Dropdown;
