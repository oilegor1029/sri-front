import React from 'react';
import { FieldArray, change, Field, arrayPush } from 'redux-form';
import { Form, Col } from 'react-bootstrap';
import _BasicFormParentClass from '../common/_BasicFormParentClass';
// components
import Dropdown from '../Dropdown';
import ToggleSection, { ToggleHeading, TogglePanel } from '../../components/ToggleSection';
import FieldInput from '../FieldInput';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import FieldArrayOwner from './FieldArrayOwner';

// const
import { SAVED } from '../../utils/constants';
import { isBrowser } from 'react-device-detect';

import { renderRackToggleSection } from '../common/formsSections/RackToggleSection';
import renderFormBlockSection from '../common/BlockSection';

class _FirewallFormParentClass extends _BasicFormParentClass {
  // GLOBAL VARs
  IS_UPDATED_FORM = undefined;
  FORM_ID = '';
  MODEL_NAME = 'firewall';
  ROUTE_LIST_DIRECTION = '/network/firewalls';

  shouldComponentUpdate(nextProps, nextState) {
    const confirmedDelete = !this.props.isDeleteConfirmed && nextProps.isDeleteConfirmed;
    if (confirmedDelete && nextProps.confirmModalType === 'partialDelete') {
      this.props.hideModalConfirm();
      this.updateMutation(this.entityDataToUpdate, this);
    }
    if (nextProps.entitySavedId) {
      const selectionData = {
        id: nextProps.entitySavedId,
      };
      const methodName = `get${nextProps.entityInModalName}ById`;
      this.handleSelectedNetworkOrganization(selectionData, methodName);
      return false;
    }
    return true;
  }

  handleSelectedNetworkOrganization = (selection, typeOfSelection) => {
    if (selection !== null && selection.id) {
      this.props[typeOfSelection](selection.id).then((entity) => {
        const newEntity = {
          type: entity.__typename,
          __typename: entity.__typename,
          name: entity.name,
          id: entity.id,
          status: 'saved',
        };
        this.props.dispatch(arrayPush(this.props.form, 'owner', newEntity));
      });
    }
  };

  renderSections(editMode) {
    const { t, rack_position, rack_units } = this.props;
    return (
      <>
        {this.renderModelMainSection(editMode)}
        {renderRackToggleSection(editMode, { t, rack_position, rack_units })}
        {this.renderOwnerToggleSection(editMode)}
        {this.renderWorkLog()}
      </>
    );
  }

  renderModelMainSection(editMode = true) {
    return (
      <section className="model-section">
        <Form.Row>
          <Col>
            <Col>{this.renderDescriptionToggleSection(editMode)}</Col>
            <hr />
            <Col>{this.renderGeneralInfoToggleSection(editMode)}</Col>
            <hr />
            <Col>{this.renderDetailsToggleSection(editMode)}</Col>
            <hr />
            <Col>{this.renderSecurityToggleSection(editMode)}</Col>
            <hr />
            <Col>{this.renderOSToggleSection(editMode)}</Col>
          </Col>
        </Form.Row>
      </section>
    );
  }

  renderGeneralInfoToggleSection(editMode = true) {
    const { t, operational_state, contract_number, managed_by } = this.props;

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
        title: t('general-forms/contract-number'),
        presentContent: contract_number,
        editContent: (
          <Form.Group>
            <Field
              type="text"
              name="contract_number"
              component={FieldInput}
              placeholder={t('general-forms/write-text')}
            />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/managed-by'),
        presentContent: managed_by,
        editContent: (
          <Dropdown
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            emptyLabel="Select type"
            type="host_management_sw"
            name="managed_by"
            onChange={(e) => {}}
          />
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

  renderDetailsToggleSection(editMode = true) {
    const { t, model, vendor, backup, end_support } = this.props;
    const detailsInfo = [
      {
        title: t('general-forms/model'),
        presentContent: model,
        editContent: (
          <Form.Group>
            <Field type="text" name="model" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/vendor'),
        presentContent: vendor,
        editContent: (
          <Form.Group>
            <Field type="text" name="vendor" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/contract-backup'),
        presentContent: backup,
        editContent: (
          <Form.Group>
            <Field type="text" name="backup" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/end-support'),
        presentContent: end_support,
        editContent: (
          <Form.Group>
            <DayPickerInput
              value={end_support}
              placeholder="yyyy-mm-dd"
              format="YYYY-MM-DD"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                locale: 'en',
                localeUtils: MomentLocaleUtils,
                numberOfMonths: 1,
              }}
              onDayChange={(newDate) => {
                const formattedDate = newDate ? formatDate(newDate, 'YYYY-MM-DD') : '';
                this.props.dispatch(change(this.props.form, 'end_support', formattedDate));
              }}
            />
          </Form.Group>
        ),
      },
    ];
    return (
      <ToggleSection>
        <ToggleHeading>
          <h2>{t('general-forms/details')}</h2>
        </ToggleHeading>
        <TogglePanel>
          <div>
            <div className="form-internal-block">
              {detailsInfo.map((formData, index) => {
                return renderFormBlockSection(editMode, formData, index);
              })}
            </div>
          </div>
        </TogglePanel>
      </ToggleSection>
    );
  }

  renderSecurityToggleSection(editMode = true) {
    const {
      t,
      securityClassObj,
      supportGroupObj,
      support_group_id,
      responsibleGroupObj,
      responsible_group_id,
    } = this.props;

    const securityInfo = [
      {
        title: t('general-forms/security-class'),
        presentContent: securityClassObj ? securityClassObj.name : undefined,
        editContent: (
          <Dropdown
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            emptyLabel="Select type"
            type="security_classes"
            name="security_class"
            onChange={(e) => {}}
          />
        ),
      },
      {
        title: t('general-forms/security-comment'),
        presentContent: (
          <Form.Group>
            <Field
              as="textarea"
              rows="3"
              type="text"
              name="security_comment"
              disabled
              component={FieldInput}
              placeholder={t('general-forms/write-text')}
            />
          </Form.Group>
        ),
        editContent: (
          <Form.Group>
            <Field
              as="textarea"
              rows="3"
              type="text"
              name="security_comment"
              component={FieldInput}
              placeholder={t('general-forms/write-text')}
            />
          </Form.Group>
        ),
      },
    ];
    const securitySecondRowInfo = [
      {
        title: t('general-forms/support-group'),
        presentContent: supportGroupObj ? supportGroupObj.name : '',
        editContent: (
          <div className="mr-3">
            <Dropdown
              className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
              type="combo_list"
              name="support_group_id"
              model="group"
              placeholder={t('general-forms/write-support-group')}
              currentValue={support_group_id}
              objectCurrentValue={supportGroupObj}
              nameDataInsideRequest="all_groups"
              valueField="id"
              labelElementsArray={['name']}
              onChange={(newSupportGroup) => {
                this.props.dispatch(
                  change(this.props.form, 'support_group_id', newSupportGroup ? newSupportGroup.id : null),
                );
                this.props.dispatch(
                  change(this.props.form, 'supportGroupObj', newSupportGroup ? newSupportGroup : null),
                );
              }}
            />
          </div>
        ),
      },
      {
        title: t('general-forms/responsible-group'),
        presentContent: responsibleGroupObj ? responsibleGroupObj.name : '',
        editContent: (
          <Dropdown
            className={`${isBrowser ? 'auto' : 'xlg mw-100'}`}
            type="combo_list"
            name="responsible_group_id"
            model="group"
            placeholder={t('general-forms/write-responsible-group')}
            currentValue={responsible_group_id}
            objectCurrentValue={responsibleGroupObj}
            nameDataInsideRequest="all_groups"
            valueField="id"
            labelElementsArray={['name']}
            onChange={(newSupportGroup) => {
              this.props.dispatch(
                change(this.props.form, 'responsible_group_id', newSupportGroup ? newSupportGroup.id : null),
              );
              this.props.dispatch(
                change(this.props.form, 'responsibleGroupObj', newSupportGroup ? newSupportGroup : null),
              );
            }}
          />
        ),
      },
    ];
    return (
      <ToggleSection>
        <ToggleHeading>
          <h2>{t('general-forms/security')}</h2>
        </ToggleHeading>
        <TogglePanel>
          <div>
            <div className="form-internal-block">
              {securityInfo.map((formData, index) => {
                return renderFormBlockSection(editMode, formData, index);
              })}
            </div>
            <div className="form-internal-block">
              {securitySecondRowInfo.map((formData, index) => {
                return renderFormBlockSection(editMode, formData, index);
              })}
            </div>
          </div>
        </TogglePanel>
      </ToggleSection>
    );
  }

  renderOSToggleSection(editMode = true) {
    const { t, os, os_version, max_number_of_ports, service_tag } = this.props;

    const osInfo = [
      {
        title: t('general-forms/os'),
        presentContent: os,
        editContent: (
          <Form.Group>
            <Field type="text" name="os" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/os-version'),
        presentContent: os_version,
        editContent: (
          <Form.Group>
            <Field type="text" name="os_version" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/max-number-of-ports'),
        presentContent: max_number_of_ports,
        editContent: (
          <Form.Group>
            <Field
              type="text"
              name="max_number_of_ports"
              component={FieldInput}
              placeholder={t('general-forms/write-number')}
            />
          </Form.Group>
        ),
      },
      {
        title: t('general-forms/service-tag'),
        presentContent: service_tag,
        editContent: (
          <Form.Group>
            <Field type="text" name="service_tag" component={FieldInput} placeholder={t('general-forms/write-text')} />
          </Form.Group>
        ),
      },
    ];
    return (
      <ToggleSection>
        <ToggleHeading>
          <h2>{t('general-forms/os')}</h2>
        </ToggleHeading>
        <TogglePanel>
          <div>
            <div className="form-internal-block">
              {osInfo.map((formData, index) => {
                return renderFormBlockSection(editMode, formData, index);
              })}
            </div>
          </div>
        </TogglePanel>
      </ToggleSection>
    );
  }

  renderOwnerToggleSection(editMode = false) {
    const { t, owner, entityRemovedId } = this.props;
    return (
      <section className="model-section">
        <ToggleSection>
          <ToggleHeading>
            <h2>{t('general-forms/owner')}</h2>
          </ToggleHeading>

          <TogglePanel>
            <FieldArray
              name="owner"
              component={FieldArrayOwner}
              editable={editMode}
              dispatch={this.props.dispatch}
              errors={this.props.formSyncErrors.parents}
              metaFields={this.props.fields}
              handleDeployCreateForm={(typeEntityToShowForm) => {
                this.props.showModalCreateForm(typeEntityToShowForm);
              }}
              showRowEditModal={(typeEntityToShowForm, entityId) => {
                this.props.showModalEditForm(typeEntityToShowForm, entityId);
              }}
              showRowDetailModal={(typeEntityToShowForm, entityId) => {
                this.props.showModalDetailForm(typeEntityToShowForm, entityId);
              }}
              handleSearchResult={this.handleSelectedNetworkOrganization}
              rerenderOnEveryChange
              entityRemovedId={entityRemovedId}
              disabledFilters={owner && owner.filter((o) => o.status === SAVED).length > 0}
            />
          </TogglePanel>
        </ToggleSection>
      </section>
    );
  }
}

export default _FirewallFormParentClass;
