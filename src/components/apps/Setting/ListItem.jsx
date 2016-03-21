import React from 'react';
import style from './ListItem.css';

class ListItem extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={style.listItem}>
        <div className={style.iconWrap}></div>
        <div className={style.contentWrap}>{this.props.name}</div>
      </div>
    );
  }
}

export default ListItem;