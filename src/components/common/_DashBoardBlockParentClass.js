// Common imports
import React from 'react';
// scss
import '../../style/ModelDetails.scss';

class _DashBoardBlockParentClass extends React.Component {
  constructor(props) {
    super(props);
    this.NUMBER_MAX_ROWS = 6;
    this.MAIN_CLASS = 'dashboard-block';
  }

  componentDidMount() {}

  render() {
    return <div>This method should be overwritten in the child class</div>;
  }
}
export default _DashBoardBlockParentClass;
