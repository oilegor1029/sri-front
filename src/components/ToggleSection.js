import React from 'react';
import PropTypes from 'prop-types';

import '../style/ToggleSection.scss';

export const PanelEditable = React.createContext(false);

class ToggleSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  static propTypes = {
    defaultEditable: PropTypes.bool,
    handleTogglePanel: PropTypes.func,
  };

  static defaultProps = {
    defaultEditable: true,
  };

  handleTogglePanel = (event) => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div className={`toggle-section ${this.props.extraClassNames ? this.props.extraClassNames : ''}`}>
        <PanelEditable.Provider value={this.props.editable}>
          {React.Children.map(this.props.children, (child, index) => (
            <>
              {index === 0 && (
                <ToggleHeading
                  {...child.props}
                  togglePanel={this.handleTogglePanel}
                  defaultEditable={this.props.defaultEditable}
                  aria-expanded={this.state.visible}
                >
                  {child.props.children}
                </ToggleHeading>
              )}
              {index === 1 && (
                <TogglePanel {...child.props} show={this.state.visible} editable={this.props.editable}>
                  {child.props.children}
                </TogglePanel>
              )}
            </>
          ))}
        </PanelEditable.Provider>
      </div>
    );
  }
}

export class ToggleHeading extends React.Component {
  handleTogglePanel = (event) => {
    this.props.togglePanel(event);
  };

  handleEditPanel = (event) => {
    this.props.editPanel(event);
  };

  static propTypes = {
    togglePanel: PropTypes.func,
    editPanel: PropTypes.func,
  };

  render() {
    return (
      <div
        className={`toggle-header ${this.props.extraClassNames ? this.props.extraClassNames : ''}`}
        onClick={(e) => this.handleTogglePanel(e)}
      >
        {this.props.children}
        {!this.props.isLikeOption && <span className="colapse" aria-expanded={this.props['aria-expanded']}></span>}
      </div>
    );
  }
}

export class TogglePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  UNSAFE_componentWillUpdate(prevProps) {
    if (this.props.editable !== prevProps.editable) {
      this.setState({ editable: prevProps.editable });
    }
  }

  render() {
    return this.props.show && <div className="toggle-panel">{this.props.children}</div>;
  }
}

export default ToggleSection;
