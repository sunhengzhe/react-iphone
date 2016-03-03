import React from 'react';
import style from './LockScreen.css';

class LockScreen extends React.Component {
  render() {
    return (
      <div>
        <div className={style.bgWrap}></div>
        <div className={style.lockWrap}></div>
      </div>
    );
  }
}

export default LockScreen;