import React from 'react';
import OptionallyDisplayed from './OptionallyDisplayed.jsx';

export default class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    return this.props.showError && this.props.errorText != "";
  }

  render() {
    return (
      <div>
        <input type="text" placeholder={this.props.placeholder}
               value={this.props.text} onChange={this.props.onFieldChanged}  />
        <OptionallyDisplayed display={this.shouldDisplayError()}>
          <div className="validation-error">
            <span className="text">{this.props.errorText}</span>
          </div>
        </OptionallyDisplayed>
      </div>
    );
  }
}

TextField.propTypes = {
  showError: React.PropTypes.bool.isRequired,
  onFieldChanged: React.PropTypes.func.isRequired
};

