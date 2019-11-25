import { connect } from "react-redux";
import { getFormMeta, getFormSyncErrors, formValueSelector } from "redux-form";
import { getContact } from "../../components/contact/Contact";

import * as actions from "../../actions/Notify";
import CreateGroupForm from "../../components/group/CreateGroupForm";

const mapStateToProps = (state, props) => {
    const updateGroupSelector = formValueSelector("createGroup");
    return {
        fields: getFormMeta("createGroup")(state),
        formSyncErrors: getFormSyncErrors("createGroup")(state),
        memberValues: updateGroupSelector(state, "members"),
        name: updateGroupSelector(state, "name"),
        getContact: (handle_id) => getContact(handle_id)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        notify: (msg, level) => {
            dispatch(actions.notify(msg, level));
        }
    };
};

const CreateGroupFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGroupForm);

export default CreateGroupFormContainer;