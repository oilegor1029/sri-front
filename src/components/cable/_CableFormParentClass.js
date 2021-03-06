import _BasicFormParentClass from '../common/_BasicFormParentClass';
// Common imports
import React from 'react';
import { FieldArray, arrayPush } from 'redux-form';
import { change } from 'redux-form';
// components
import Dropdown from '../Dropdown';
import ToggleSection, { ToggleHeading, TogglePanel } from '../../components/ToggleSection';
import FieldArrayConnections from './FieldArrayConnections';
// const
import { isBrowser } from 'react-device-detect';
import { SAVED } from '../../utils/constants';
// scss
import '../../style/ModelDetails.scss';

import renderFormBlockSection from '../common/BlockSection';

class _CableFormParentClass extends _BasicFormParentClass {
  // GLOBAL VARs
  IS_UPDATED_FORM = undefined;
  FORM_ID = '';
  MODEL_NAME = 'cable';
  ROUTE_LIST_DIRECTION = '/network/cables';
  MAX_CONNECTIONS = 2;

  shouldComponentUpdate(nextProps, nextState) {
    const confirmedDelete = !this.props.isDeleteConfirmed && nextProps.isDeleteConfirmed;
    if (confirmedDelete && nextProps.confirmModalType === 'partialDelete') {
      this.props.hideModalConfirm();
      this.updateMutation(this.entityDataToUpdate, this);
    }
    if (nextProps.entitySavedId) {
      const { fieldModalOpened } = nextState;
      const selectionData = {
        id: nextProps.entitySavedId,
      };
      const methodName = `get${nextProps.entityInModalName}ById`;
      if (fieldModalOpened === 'connections') {
        this.getConnectionDetails(selectionData, methodName);
      }
      return false;
    }
    return true;
  }

  getConnectionDetails(selectionData) {
    if (selectionData !== null) {
      this.props.getPortById(selectionData.id).then((port) => {
        this.handleConnectionSearch(port);
      });
    }
  }

  handleConnectionSearch(newConnection) {
    if (newConnection !== null) {
      this.props.dispatch(arrayPush(this.props.form, 'connections', { ...newConnection, ...{ status: 'saved' } }));
    }
  }
  // Specific toggle sections RENDERS
  renderSections(editMode) {
    return (
      <>
        {this.renderDescriptionToggleSection(editMode)}
        {this.renderGeneralInfoToggleSection(editMode)}
        {this.renderConnectionsSection(editMode)}
        {this.renderWorkLog()}
      </>
    );
  }

  renderGeneralInfoToggleSection(editMode = true) {
    const componentClassName = 'general-info-block';
    const { t, cableTypeObj, provider_id, providerObj } = this.props;
    const generalInfoFirstRow = [
      {
        title: t('general-forms/type'),
        presentContent: cableTypeObj ? cableTypeObj.name : undefined,
        editContent: (
          <Dropdown
            t={t}
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            emptyLabel="Select type"
            type="cable_types"
            name="cable_type"
            onChange={(e) => {}}
          />
        ),
      },
      {
        title: t('entity-name/provider'),
        presentContent: providerObj ? providerObj.name : '',
        editContent: (
          <Dropdown
            t={t}
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            type="combo_list"
            name="provider_id"
            model="provider"
            placeholder={t('search-filter.search-providers')}
            currentValue={provider_id}
            objectCurrentValue={providerObj}
            nameDataInsideRequest="all_providers"
            valueField="id"
            labelElementsArray={['name']}
            onChange={(newProvider) => {
              this.props.dispatch(change(this.props.form, 'provider_id', newProvider ? newProvider.id : null));
              this.props.dispatch(change(this.props.form, 'providerObj', newProvider ? newProvider : null));
            }}
          />
        ),
      },
    ];

    return (
      <section className={`model-section ${componentClassName}`}>
        <ToggleSection>
          <ToggleHeading>
            <h2>{t('general-forms/general-information')}</h2>
          </ToggleHeading>
          <TogglePanel>
            <div>
              <div className="form-internal-block">
                {generalInfoFirstRow.map((formData, index) => {
                  return renderFormBlockSection(editMode, formData, index);
                })}
              </div>
            </div>
          </TogglePanel>
        </ToggleSection>
      </section>
    );
  }

  renderConnectionsSection(editMode = false) {
    const { t, entityRemovedId } = this.props;
    const disabledFilters =
      !!this.props.connections &&
      (!this.props.connections ||
        this.props.connections.filter((cn) => cn.status === SAVED).length >= this.MAX_CONNECTIONS);
    return (
      <section className="model-section">
        <ToggleSection>
          <ToggleHeading>
            <h2>{t('general-forms/connects')}</h2>
          </ToggleHeading>

          <TogglePanel>
            <FieldArray
              name="connections"
              component={FieldArrayConnections}
              editable={editMode}
              dispatch={this.props.dispatch}
              errors={this.props.formSyncErrors.connectedTo}
              metaFields={this.props.fields}
              handleDeployCreateForm={(typeEntityToShowForm) => {
                this.setState({ fieldModalOpened: 'connections' });
                this.props.showModalCreateForm('Port');
              }}
              showRowEditModal={(typeEntityToShowForm, entityId) => {
                this.setState({ fieldModalOpened: 'connections' });
                this.props.showModalEditForm('Port', entityId);
              }}
              showRowDetailModal={(typeEntityToShowForm, entityId) => {
                this.setState({ fieldModalOpened: 'connections' });
                this.props.showModalDetailForm('Port', entityId);
              }}
              handleSearchResult={(newConnection) => {
                this.handleConnectionSearch(newConnection);
              }}
              rerenderOnEveryChange
              entityRemovedId={entityRemovedId}
              disabledFilters={disabledFilters}
            />
          </TogglePanel>
        </ToggleSection>
      </section>
    );
  }

  // Main RENDER
  render() {
    console.error('This method should be overwritten in the child class');
    return <div>This method should be overwritten in the child class</div>;
  }
}
export default _CableFormParentClass;
