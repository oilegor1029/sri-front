import { connect } from 'react-redux';
import CreateOpticalMultiplexSectionForm from '../../components/opticalMultiplexSection/CreateOpticalMultiplexSectionForm';

import { getCreateProps } from '../../utils/mapPropsFormFactory';
import { getDispatchPropsCreate } from '../../utils/mapDispatchFormFactory';

const ENTITY_NAME = 'opticalMultiplexSection';

const mapStateToProps = (state, props) => {
  const mappedStateToProps = getCreateProps(ENTITY_NAME, props, state);
  return mappedStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  const mappedDispatchToProps = getDispatchPropsCreate(dispatch, props, ENTITY_NAME);
  return mappedDispatchToProps;
};

const CreateOpticalMultiplexSectionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateOpticalMultiplexSectionForm);

export default CreateOpticalMultiplexSectionFormContainer;
