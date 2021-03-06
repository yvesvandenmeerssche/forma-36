import React from 'react';
import ControlledInputField, {
  ControlledInputFieldDefaultProps,
  ControlledInputFieldPropTypes,
} from '../ControlledInputField/ControlledInputField';

class CheckboxField extends React.Component {
  static propTypes = ControlledInputFieldPropTypes;

  static defaultProps = {
    ...ControlledInputFieldDefaultProps,
    testId: 'cf-ui-checkbox-field',
  };

  render() {
    const { testId, type, ...otherProps } = this.props;

    return (
      <ControlledInputField
        testId={testId}
        inputType="checkbox"
        {...otherProps}
      />
    );
  }
}

export default CheckboxField;
