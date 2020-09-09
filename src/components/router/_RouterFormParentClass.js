import React from 'react';
import { FieldArray, Field, arrayPush } from 'redux-form';
import _BasicFormParentClass from '../common/_BasicFormParentClass';
// components
import { Form } from 'react-bootstrap';
import Dropdown from '../Dropdown';
import ToggleSection, { ToggleHeading, TogglePanel } from '../../components/ToggleSection';
import FieldInput from '../FieldInput';
import FieldArrayPorts from '../common/FieldArrayPorts';
import BulPort from '../common/BulkPort';
import { SAVED } from '../../utils/constants';

// const
import { isBrowser } from 'react-device-detect';

import { renderRackToggleSection } from '../common/formsSections/RackToggleSection';
import renderFormBlockSection from '../common/BlockSection';

class _RouterFormParentClass extends _BasicFormParentClass {
  // GLOBAL VARs
  IS_UPDATED_FORM = false;
  FORM_ID;
  MODEL_NAME = 'router';
  ROUTE_LIST_DIRECTION = '/network/routers';

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
      if (fieldModalOpened === 'ports') {
        this.handleSelectedPort(selectionData);
      }
      return false;
    }
    return true;
  }

  handleSelectedPort = (selection) => {
    if (selection !== null && selection.id) {
      this.props.getPortById(selection.id).then((entity) => {
        const newEntity = {
          type: entity.type,
          __typename: entity.__typename,
          name: entity.name,
          id: entity.id,
          status: SAVED,
        };
        this.props.dispatch(arrayPush(this.props.form, 'ports', newEntity));
      });
    }
  };

  renderSections(editMode) {
    const { t, rack_position, rack_units, isFromModal } = this.props;
    return (
      <>
        {this.renderModelMainSection(editMode)}
        {renderRackToggleSection(editMode, { t, rack_position, rack_units })}
        {!isFromModal && this.renderPortsToggleSection(editMode)}
        {!isFromModal && editMode && this.renderBulkPortToggleSection()}
        {this.renderWorkLog()}
      </>
    );
  }

  renderGeneralInfoToggleSection(editMode = true) {
    const { t, operational_state, model, version } = this.props;

    const generalInfo = [
      {
        title: t('general-forms/operational-state'),
        presentContent: operational_state,
        editContent: (
          <Dropdown
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            emptyLabel="Select type"
            type="operational_states"
            name="operational_state"
            onChange={(e) => {}}
          />
        ),
      },
      {
        title: t('general-forms/model'),
        presentContent: model,
        editContent: (
          <Form.Group>
            <Field
              type="text"
              name="model"
              component={FieldInput}
              disabled
              placeholder={t('general-forms/write-text')}
            />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/junos-version'),
        presentContent: version,
        editContent: (
          <Form.Group>
            <Field type="text" name="version" component={FieldInput} disabled />
          </Form.Group>
        ),
      },
    ];

    return (
      <ToggleSection>
        <ToggleHeading>
          <h2>{t('general-forms/general-information')}</h2>
        </ToggleHeading>
        <TogglePanel>
          <div>
            <div className="form-internal-block">
              {generalInfo.map((formData, index) => {
                return renderFormBlockSection(editMode, formData, index);
              })}
            </div>
          </div>
        </TogglePanel>
      </ToggleSection>
    );
  }

  renderPortsToggleSection(editMode = false) {
    const { t, entityRemovedId } = this.props;
    return (
      <section className="model-section">
        <ToggleSection>
          <ToggleHeading>
            <h2>{t('main-entity-name/ports')}</h2>
          </ToggleHeading>

          <TogglePanel>
            <FieldArray
              name="ports"
              component={FieldArrayPorts}
              editable={editMode}
              dispatch={this.props.dispatch}
              errors={this.props.formSyncErrors.parents}
              metaFields={this.props.fields}
              handleDeployCreateForm={(typeEntityToShowForm) => {
                this.setState({ fieldModalOpened: 'ports' });
                this.props.showModalCreateForm(typeEntityToShowForm);
              }}
              showRowEditModal={(typeEntityToShowForm, entityId) => {
                this.setState({ fieldModalOpened: 'ports' });
                this.props.showModalEditForm(typeEntityToShowForm, entityId);
              }}
              showRowDetailModal={(typeEntityToShowForm, entityId) => {
                this.setState({ fieldModalOpened: 'ports' });
                this.props.showModalDetailForm(typeEntityToShowForm, entityId);
              }}
              handleSearchResult={this.handleSelectedPort}
              rerenderOnEveryChange
              entityRemovedId={this.state.fieldModalOpened === 'ports' ? entityRemovedId : null}
            />
          </TogglePanel>
        </ToggleSection>
      </section>
    );
  }

  renderBulkPortToggleSection() {
    const { t } = this.props;
    return (
      <section className="model-section">
        <ToggleSection>
          <ToggleHeading>
            <h2>{t('general-forms/bulk-port')}</h2>
          </ToggleHeading>
          <TogglePanel>
            <BulPort
              handleBulkPortResponse={(dataForBulkPortCreate) => {
                dataForBulkPortCreate.forEach((portData) => {
                  this.props.dispatch(arrayPush(this.props.form, 'ports', portData));
                });
              }}
            />
          </TogglePanel>
        </ToggleSection>
      </section>
    );
  }
}

export default _RouterFormParentClass;
