import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Illustration from '../Illustration';
import styles from './Asset.css';

export const types = {
  Archive: 'archive',
  Audio: 'audio',
  Code: 'code',
  Image: 'image',
  Markup: 'markup',
  Pdf: 'pdf',
  PlainText: 'plaintext',
  Presentation: 'presentation',
  Richtext: 'richtext',
  Spreadsheet: 'spreadsheet',
  Video: 'video',
};
class Asset extends React.Component {
  static propTypes = {
    extraClassNames: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
    src: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    extraClassNames: undefined,
    type: 'image',
    src: undefined,
    title: undefined,
  };

  renderImage = (src, title) => (
    <div className={styles['Asset__image-container']}>
      <img
        className={styles['Asset__image-container__image']}
        src={src}
        alt={title}
      />
      <div className={styles['Asset__image-container__title-container']}>
        <span
          className={styles['Asset__image-container__title-container__title']}
        >
          {title}
        </span>
      </div>
    </div>
  );

  renderAsset = (type, title) => {
    const illustraionName = type.charAt(0).toUpperCase(0) + type.slice(1);
    return (
      <div className={styles['Asset__asset-container']}>
        <div className={styles['Asset__illustration-container']}>
          <Illustration illustration={illustraionName} />
        </div>
        <span className={styles['Asset__asset-container__title']}>{title}</span>
      </div>
    );
  };

  render() {
    const { extraClassNames, src, title, type, ...otherProps } = this.props;

    const classNames = cn(styles.Asset, extraClassNames);

    return (
      <div className={classNames} {...otherProps}>
        {type === 'image'
          ? this.renderImage(src, title)
          : this.renderAsset(type, title)}
      </div>
    );
  }
}

export default Asset;
