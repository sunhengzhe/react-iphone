import React from 'react';
import style from './App.css';

import Mask from '../Mask/Mask.jsx';

const LockScreen = class extends React.Component {
  render(){
    return (
      <div>LockScreen</div>
    );
  }
}

const Desktop = class extends React.Component {
  render(){return (<div>Desktop</div>);}
}

class App extends React.Component {
  constructor(...args) {
    super(...args);
    // status [close, lock, unlock]
    this.state = {
      status: 'close'
    }
  }

  handleHome() {
    if(this.state.status == 'close') {
      // 开启屏幕
      this.setState({
        status: 'lock'
      })
      this.refs.mask.open();
    }
  }

  render() {
    return (
      <div className={style.phone}>
        <div className={style.tool}>
          <div className={style.ccd}></div>
          <div className={style.camera}></div>
          <div className={style.receiver}></div>
        </div>
        <div className={style.screen}>
          <Desktop />
          <LockScreen />
          <Mask ref="mask"/>
        </div>
        <div className={style.home} onMouseDown={this.handleHome.bind(this)}></div>
      </div>
    );
  }
}

export default App;
