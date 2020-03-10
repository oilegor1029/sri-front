import { connect } from "react-redux";
import EndUserUpdateForm from "../../components/endUser/EndUserUpdateForm";
import { formValueSelector, getFormMeta, getFormSyncErrors } from "redux-form";
import uuidv4 from "uuid/v4";
import * as actions from "../../actions/Notify";
// import { showNewContactForm } from "../../actions/ComponentFormRow";

const mapStateToProps = (state, props) => {
    const updateEndUserSelector = formValueSelector("updateEndUser");
    const endUser = props.endUser;

    const initialValues = {
        id: endUser.id,
        name: endUser.name,
        description: endUser.description,
        url: endUser.url
    };
    return {
        initialValues,
        name: updateEndUserSelector(state, "name"),
        description: updateEndUserSelector(state, "description"),
        formSyncErrors: getFormSyncErrors("updateEndUser")(state),
        fields: getFormMeta("updateEndUser")(state)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        notify: (msg, level) => {
            dispatch(actions.notify(msg, level));
        }
        // ,showNewContactForm
    };
};

const EndUserUpdateFormContainer = connect(mapStateToProps, mapDispatchToProps)(EndUserUpdateForm);

export default EndUserUpdateFormContainer;
