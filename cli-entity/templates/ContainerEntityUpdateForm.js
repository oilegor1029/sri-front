import { connect } from "react-redux";
import __EntityClassName__UpdateForm from "../../components/__entityName__/__EntityClassName__UpdateForm";
import { formValueSelector, getFormMeta, getFormSyncErrors } from "redux-form";
import uuidv4 from "uuid/v4";
import * as actions from "../../actions/Notify";
// import { showNewContactForm } from "../../actions/ComponentFormRow";

const mapStateToProps = (state, props) => {
    const update__EntityClassName__Selector = formValueSelector("update__EntityClassName__");
    const __entityName__ = props.__entityName__;

    const initialValues = {
        id: __entityName__.id,
        name: __entityName__.name,
        description: __entityName__.description,
        url: __entityName__.url
    };
    return {
        initialValues,
        name: update__EntityClassName__Selector(state, "name"),
        description: update__EntityClassName__Selector(state, "description"),
        formSyncErrors: getFormSyncErrors("update__EntityClassName__")(state),
        fields: getFormMeta("update__EntityClassName__")(state)
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

const __EntityClassName__UpdateFormContainer = connect(mapStateToProps, mapDispatchToProps)(__EntityClassName__UpdateForm);

export default __EntityClassName__UpdateFormContainer;
