import React from 'react';
import { withTranslation } from 'react-i18next';
import { change } from 'redux-form';
import CopyToClipboard from '../CopyToClipboard';
import copy from 'clipboard-copy';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { isBrowser, isMobile } from 'react-device-detect';
import { UNLINK, SAVED, REMOVE } from '../../utils/constants';
import ReactSVG from 'react-svg';
// import CONFIG from "../../config";

import DropdownSearch from '../DropdownSearch';

class FieldArrayMembersGroup extends React.Component {
  state = {
    showModal: false, // DEFAULT: false
    selectedRowId: null, // DEFAULT: null
  };

  // lifecycle
  shouldComponentUpdate(nextProps, nextState) {
    const newRemovedContact =
      !!nextProps.removedContactId && nextProps.removedContactId !== this.props.removedContactId;
    if (newRemovedContact) {
      this.props.removedContactDeletedFromTheList();
      this.removeRow(nextProps.removedContactId);
    }
    return !newRemovedContact;
  }

  // methods events
  onClickAccept() {
    // TODO: Validate before hide modal
    this.hideDataModal();
  }
  onChangeRole = (event, index) => {
    const { selectedIndex } = event.target.selectedIndex;
    let organization_label = '';
    if (selectedIndex !== 0) {
      organization_label = event.target.options[event.target.selectedIndex].text;
    }
    this.props.dispatch(change(this.props.meta.form, `members[${index}].organization_label`, organization_label));
  };

  // methods state
  showDataModal(id) {
    this.setState({
      showModal: true,
      selectedRowId: id,
    });
  }

  hideDataModal() {
    this.setState({
      showModal: false,
      selectedRowId: null,
    });
  }
  // methods getData
  getValueById(id) {
    const allValues = this.props.fields.getAll();
    const valueData = allValues.find((value) => value.id === id);
    const valueIndex = allValues.findIndex((value) => value.id === id);

    return {
      data: valueData,
      index: valueIndex,
    };
  }
  // methods validation
  validateMember = (index) => {
    const errors = this.props.errors;
    const values = this.props.fields.getAll();
    const hasBlankFields =
      values[index].name === '' ||
      values[index].name === undefined ||
      values[index].email === '' ||
      values[index].email === undefined ||
      values[index].phone === '' ||
      values[index].phone === undefined;
    return (errors && errors[index] === undefined) || (errors === undefined && !hasBlankFields);
  };

  // methods rows

  //   removeRow = (key) => {
  //     const currentValue = this.getValueById(key);
  //     this.hideDataModal();
  //     if (currentValue.data.origin === 'store') {
  //       this.props.dispatch(change(this.props.meta.form, `members[${currentValue.index}].status`, 'remove'));
  //     } else {
  //       this.props.fields.remove(currentValue.index);
  //     }
  //   };

  removeRow(id) {
    const currentValue = this.getValueById(id);
    const newStatus = currentValue.data.status === REMOVE ? SAVED : REMOVE;
    this.hideDataModal();
    this.props.dispatch(
      this.props.dispatch(change(this.props.meta.form, `members[${currentValue.index}].status`, newStatus)),
    );
  }

  unlinkRow(id) {
    const currentValue = this.getValueById(id);
    const newStatus = currentValue.data.status === UNLINK ? SAVED : UNLINK;
    this.hideDataModal();
    if (currentValue.data.origin === 'store') {
      this.props.dispatch(
        this.props.dispatch(change(this.props.meta.form, `members[${currentValue.index}].status`, newStatus)),
      );
    } else {
      this.props.fields.remove(currentValue.index);
    }
  }

  openEditRow(id) {
    this.props.handleShowContactEdition(id);
  }

  addRow = (event) => {
    this.props.handleAddContactRow();
  };

  generateSubDataList = (field, keyName, secondaryKeyName) => {
    const getSecondaryKeyName = (element, doubleKeyForObject) => {
      const keysArr = doubleKeyForObject.split('.');
      return element[keysArr[0]][keysArr[1]];
    };
    const result = field ? (
      <>
        <div className="form-internal-block--contact-in-organization__section__content__internal-list form-internal-block__section__content__internal-list">
          {field[keyName].map((element, internalIndex) => {
            const useClipToClipboardContainer = !!secondaryKeyName;
            const child = (
              <div className={`form-internal-block--contact-in-organization__section__content__internal-list__element`}>
                <div className="form-internal-block--contact-in-organization__section__content__internal-list__element__main-text">
                  {element.name}
                </div>
                <div className="form-internal-block--contact-in-organization__section__content__internal-list__element__secondary-text">
                  {secondaryKeyName ? getSecondaryKeyName(element, secondaryKeyName) : ''}
                </div>
              </div>
            );
            let resultContainer;
            if (useClipToClipboardContainer) {
              resultContainer = (
                <CopyToClipboard key={internalIndex} copyContent={element.name}>
                  {child}
                </CopyToClipboard>
              );
            } else {
              resultContainer = <div key={internalIndex}>{child}</div>;
            }
            return resultContainer;
          })}
        </div>
      </>
    ) : (
      <div></div>
    );
    return result;
  };

  getAllEmailsFromAllContacts = () => {
    const values = this.props.fields.getAll();
    let result = [];
    if (values) {
      result = values.map((member) => {
        const isNecessaryGetEmails = member.status === 'saved' && member.email;
        return isNecessaryGetEmails ? member.email.map((email) => email.name) : [];
      });
    }
    return result;
  };

  copyAllEmails = () => {
    const emails = this.getAllEmailsFromAllContacts();
    copy(emails.flat().join(' '));
  };

  // common Renders
  renderModal() {
    const { t } = this.props;
    return (
      <Modal
        centered
        dialogClassName="internal-modal role-organization"
        show={this.state.showModal}
        onHide={() => this.setState({ showModal: false })}
      >
        <Modal.Header closeButton={true}>
          <h2>{t('general-forms/professional-details')}</h2>
        </Modal.Header>
        <Modal.Body className="organizations-contacts">
          <div className="model-details">
            <div className="model-section model-section--in-modal">
              {this.renderInternalModalForm(this.state.selectedRowId)}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  //   renderInternalModalForm(fieldKey) {
  //     const { editable } = this.props;
  //     return (
  //       <div className="form-internal-block form-internal-block--organizations-contacts">
  //         {this.renderInternalModalBody(fieldKey)}
  //         {editable && isMobile && this.renderMobileFooterModalButtons(fieldKey)}
  //       </div>
  //     );
  //   }

  //   renderInternalModalBody(key) {
  //     const { t } = this.props;
  //     const dataValue = this.getValueById(key);
  //     const row = dataValue.data;
  //     const index = dataValue.index;
  //     const flexClassesToMobileStructure = 'd-flex align-items-start flex-column';
  //     return (
  //       <div className="contact-in-organization__body">
  //         <div
  //           key={index}
  //           className={`${flexClassesToMobileStructure} contact-in-organization__body__row ${
  //             row.status === 'remove' ? 'd-none' : ''
  //           }`}
  //         >
  //           <div className="contact-in-organization__body__row__element">
  //             <div className="contact-in-organization__header__title">{t('general-forms/name')}</div>
  //             {row.name}
  //           </div>
  //           <div className="contact-in-organization__body__row__element">
  //             <div className="contact-in-organization__header__title">{t('main-entity-name/organizations')}</div>
  //             {this.generateSubDataList(row, 'organization_label')}
  //           </div>
  //           <div className="contact-in-organization__body__row__element contact-in-organization__body__row__element--ellipsis">
  //             <div className="contact-in-organization__header__title">{t('general-forms/emails')}</div>
  //             {this.generateSubDataList(row, 'email', 'type.name')}
  //           </div>
  //           <div className="contact-in-organization__body__row__element contact-in-organization__body__row__element--ellipsis">
  //             <div className="contact-in-organization__header__title">{t('general-forms/phone')}</div>
  //             {this.generateSubDataList(row, 'phone')}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  renderMoreInfoButton(id) {
    const { t } = this.props;
    return (
      <button
        type="button"
        className="btn outline btn-add more-info"
        onClick={() => this.props.handleShowContactDetail(id)}
      >
        <span>{t('actions/info')}</span>
      </button>
    );
  }

  //   renderEditContactButton(key) {
  //     const { t } = this.props;
  //     return (
  //       <button
  //         type="button"
  //         onClick={() => {
  //           this.props.handleShowContactDetail(key);
  //         }}
  //         className="btn outline btn-edit"
  //       >
  //         <i className="icon-pencil"></i>
  //         <span>{t('actions/edit')}</span>
  //       </button>
  //     );
  //   }

  //   renderRemoveCtaCrossAndEditButton(key) {
  //     return (
  //       <div
  //         className={`contact-in-organization__body__buttons-in-the-final-row ${
  //           isBrowser ? 'contact-in-organization__body__buttons-in-the-final-row--desktop-version' : ''
  //         }`}
  //       >
  //         {isBrowser && this.renderEditContactButton(key)}
  //         <div
  //           className={`row-cross-remove-cta ${isBrowser ? 'row-cross-remove-cta--desktop-version' : ''}`}
  //           onClick={() => this.removeRow(key)}
  //         ></div>
  //       </div>
  //     );
  //   }

  renderMobileFooterModalButtons(key) {
    return (
      <div className="d-flex justify-content-around">
        {this.renderAcceptModalButton()}
        {this.renderRemoveCtaButton(key)}
      </div>
    );
  }

  renderButtonsBox(id) {
    const { t } = this.props;
    const rowDetails = this.getValueById(id);
    return (
      <div className={`contact-in-organization__body__buttons-in-the-final-row`}>
        <OverlayTrigger overlay={<Tooltip id="tooltip-unlink">{t('actions/unlink')}</Tooltip>}>
          <div
            className={`row-cta unlink ${rowDetails.data.status === UNLINK ? 'active' : ''}`}
            onClick={() => this.unlinkRow(id)}
          >
            <ReactSVG src={require(`../../static/img/unlink.svg`)} wrapper="span" />
          </div>
        </OverlayTrigger>

        <OverlayTrigger overlay={<Tooltip id="tooltip-openEdit">{t('actions/open_edition')}</Tooltip>}>
          <div className={`row-cta edit`} onClick={() => this.openEditRow(id)}>
            <ReactSVG src={require(`../../static/img/grey-pencil-icon.svg`)} wrapper="span" />
          </div>
        </OverlayTrigger>

        <OverlayTrigger overlay={<Tooltip id="tooltip-remove">{t('actions/move_to_trash')}</Tooltip>}>
          <div
            className={`row-cta remove ${rowDetails.data.status === REMOVE ? 'active' : ''}`}
            onClick={() => this.removeRow(id)}
          >
            <ReactSVG src={require(`../../static/img/trash.svg`)} wrapper="span" />
          </div>
        </OverlayTrigger>
      </div>
    );
  }

  renderAcceptModalButton() {
    const { t } = this.props;
    return (
      <button
        type="button"
        className="btn outline check mt-3"
        onClick={() => {
          this.onClickAccept();
        }}
      >
        <span> {t('actions/accept')}</span>
      </button>
    );
  }

  renderRemoveCtaButton(key) {
    const { t } = this.props;
    return (
      <button
        type="button"
        className="btn outline btn-trash mt-3"
        onClick={() => {
          this.hideDataModal();
          this.removeRow(key);
        }}
      >
        <span> {t('actions/delete')}</span>
      </button>
    );
  }

  renderHeader() {
    const { t } = this.props;
    const headers = isMobile
      ? [t('general-forms/name')]
      : [
          t('general-forms/name'),
          t('main-entity-name/organizations'),
          this.renderEmailsHeader(),
          t('general-forms/phone'),
        ];
    return (
      <div className="contact-in-organization__header">
        {headers.map((title, index) => {
          return (
            <div key={index} className="contact-in-organization__header__title">
              {title}
            </div>
          );
        })}
      </div>
    );
  }

  renderBody() {
    const { editable, fields } = this.props;
    const values = fields.getAll();
    return (
      <div className="contact-in-organization__body">
        {values &&
          values.map((row, index) => {
            return (
              <div
                key={index}
                className={`contact-in-organization__body__row ${
                  row.status !== SAVED ? 'contact-in-organization__body__row--disabled' : ''
                }`}
              >
                <div className="contact-in-organization__body__row__element">{row.name}</div>
                {isBrowser && (
                  <div className="contact-in-organization__body__row__element">
                    {this.generateSubDataList(row, 'organization_label')}
                  </div>
                )}
                {isBrowser && (
                  <div className="contact-in-organization__body__row__element contact-in-organization__body__row__element--ellipsis">
                    {this.generateSubDataList(row, 'email', 'type.name')}
                  </div>
                )}
                {isBrowser && (
                  <div className="contact-in-organization__body__row__element contact-in-organization__body__row__element--ellipsis">
                    {this.generateSubDataList(row, 'phone')}
                  </div>
                )}

                {editable && this.renderButtonsBox(row.id)}
                {!editable && row.status === SAVED && this.renderMoreInfoButton(row.id)}
              </div>
            );
          })}
      </div>
    );
  }

  renderFooter() {
    const { t, editable } = this.props;
    return (
      <div className="contact-in-organization__footer">
        {editable && (
          <>
            <DropdownSearch
              model={'contacts'}
              selection={this.props.handleContactSearch}
              placeholder={t('search-filter.search-member')}
            />
            <button
              type="button"
              className="contact-in-organization__footer__add btn btn-add outline"
              onClick={(e) => this.addRow(e)}
            >
              {t('actions/add-new')}
            </button>
          </>
        )}
      </div>
    );
  }

  // specific renders
  renderEmailsHeader() {
    const { t } = this.props;
    return (
      <div className="contact-in-organization__header__title--with-cta">
        <span>{t('general-forms/emails')}</span>
        {this.getAllEmailsFromAllContacts().length > 0 && (
          <button type="button" onClick={() => this.copyAllEmails()} className="btn outline btn-copy">
            <span>{t('actions/copy-all')}</span>
          </button>
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="contact-in-organization">
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
        {this.state.showModal && this.renderModal()}
      </div>
    );
  }
}

export default withTranslation()(FieldArrayMembersGroup);
