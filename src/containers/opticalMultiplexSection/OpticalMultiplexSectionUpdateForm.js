import { connect } from 'react-redux';
import OpticalMultiplexSectionUpdateForm from '../../components/opticalMultiplexSection/OpticalMultiplexSectionUpdateForm';

import { getUpdateProps } from '../../utils/mapPropsFormFactory';
import { getDispatchPropsUpdate } from '../../utils/mapDispatchFormFactory';

const ENTITY_NAME = 'opticalMultiplexSection';

const mapStateToProps = (state, props) => {
  const mappedStateToProps = getUpdateProps(ENTITY_NAME, props, state);
  return mappedStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  const mappedDispatchToProps = getDispatchPropsUpdate(dispatch, props, ENTITY_NAME);
  return mappedDispatchToProps;
};

const OpticalMultiplexSectionUpdateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpticalMultiplexSectionUpdateForm);

export default OpticalMultiplexSectionUpdateFormContainer;
