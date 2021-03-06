import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CopyButton from '../CopyButton';
import styles from './TextInput.css';

class TextInput extends React.Component {
  static propTypes = {
    width: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
    type: PropTypes.oneOf([
      'text',
      'password',
      'email',
      'number',
      'search',
      'url',
    ]),
    name: PropTypes.string,
    id: PropTypes.string,
    extraClassNames: PropTypes.string,
    withCopyButton: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    testId: PropTypes.string,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onCopy: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    name: undefined,
    id: undefined,
    extraClassNames: undefined,
    placeholder: undefined,
    withCopyButton: false,
    maxLength: undefined,
    onChange: undefined,
    onBlur: undefined,
    onCopy: undefined,
    testId: 'cf-ui-text-input',
    value: undefined,
    error: undefined,
    type: undefined,
    disabled: false,
    required: false,
    width: 'full',
  };

  state = {
    value: this.props.value,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  handleFocus = e => {
    if (this.props.disabled) {
      e.target.select();
    }
  };

  render() {
    const {
      extraClassNames,
      withCopyButton,
      placeholder,
      maxLength,
      disabled,
      required,
      onChange,
      testId,
      onBlur,
      onCopy,
      error,
      width,
      value,
      type,
      name,
      id,
      ...otherProps
    } = this.props;

    const widthClass = `TextInput--${width}`;
    const classNames = cn(
      styles.TextInput,
      extraClassNames,
      styles[widthClass],
      {
        [styles['TextInput--disabled']]: disabled,
        [styles['TextInput--negative']]: error,
      },
    );

    return (
      <div className={classNames}>
        <input
          aria-label={name}
          className={styles.TextInput__input}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          data-test-id={testId}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={this.handleFocus}
          onChange={e => {
            if (disabled) return;

            if (onChange) {
              onChange(e);
            }
            this.setState({ value: e.target.value });
          }}
          value={this.state.value}
          type={type}
          {...otherProps}
        />
        {withCopyButton && (
          <CopyButton
            onCopy={onCopy}
            copyValue={this.state.value}
            extraClassNames={styles['TextInput__copy-button']}
          />
        )}
      </div>
    );
  }
}

export default TextInput;
