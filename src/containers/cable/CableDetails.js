import { connect } from 'react-redux';
import * as notifyActions from '../../actions/Notify';
import * as formModalActions from '../../actions/FormModal';

import CableDetails from '../../components/cable/CableDetails';

const mapStateToProps = (state, props) => {
  return {
    idFromModal: state.formModal.entityId,
    history: props.history,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    notify: (msg, level) => {
      dispatch(notifyActions.notify(msg, level));
    },
    hideModalForm: () => {
      dispatch(formModalActions.hideModalForm());
    },
    deletedEntity: (cableId) => {
      dispatch(formModalActions.deletedEntity('Cable', cableId));
    },
  };
};

const CableDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(CableDetails);

export default CableDetailsContainer;
