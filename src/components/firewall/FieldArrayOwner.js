import _BasicFieldArrayParentClass from '../common/_BasicFieldArrayParentClass';
// Common imports
import { withTranslation } from 'react-i18next';

class FieldArrayOwner extends _BasicFieldArrayParentClass {
  constructor(props) {
    super(props);
    this.FIELD_NAME_IN_FORM = 'owner';
    this.HEADER_TEXTS = {
      summary: [
        {
          text: 'contact-details.name',
          fieldKey: 'name',
        },
      ],
      all: [
        {
          text: 'contact-details.name',
          fieldKey: 'name',
        },
        {
          text: 'organization-details.type',
          fieldKey: 'type.name',
        },
      ],
      modal: ['network.details.parent_element_detail'],
    };
    this.PRE_FILTER_SELECT = {
      label: 'physical.select_type',
      type: 'owners_types',
      model: 'owners_types',
      name: 'owners_types_preFilter',
    };
    this.ENTITIES_WITHOUT_MODAL = ['HostUser'];
  }
}

export default withTranslation()(FieldArrayOwner);
