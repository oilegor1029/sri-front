import { connect } from 'react-redux';
import * as notifyActions from '../../actions/Notify';
import * as confirmModalActions from '../../actions/ConfirmModal';

import RoomDetails from '../../components/room/RoomDetails';

const mapStateToProps = (state, props) => {
  return {
    idFromModal: state.formModal.entityId,
    history: props.history,
    isDeleteConfirmed: state.confirmModal.confirmDelete,
    confirmModalType: state.confirmModal.type,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    notify: (msg, level) => {
      dispatch(notifyActions.notify(msg, level));
    },
    showModalConfirm: (type) => {
      dispatch(confirmModalActions.showModalConfirm(type));
    },
    hideModalConfirm: () => {
      dispatch(confirmModalActions.hideModalConfirm());
    },
  };
};

const RoomDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(RoomDetails);

export default RoomDetailsContainer;
