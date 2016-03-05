import React from 'react';
import style from './App.css';

import Mask from '../Mask/Mask.jsx';
import LockScreen from '../LockScreen/LockScreen.jsx';
import Desktop from '../Desktop/Desktop.jsx';

const CLOSE_TIME = 10;

class App extends React.Component {
  constructor(...args) {
    super(...args);
    // status [close, lock, unlock]
    this.state = {
      status: 'close',
      leaveTime: 0,
      leaveInterval: null
    }
  }

  /**
   * home 键按钮
   * @return {[type]} [description]
   */
  handleHome() {
    this.openScreen();
    if(this.state.status == 'close') {
      // 开启屏幕
      this.openScreen();
    }else if(this.state.status == 'lock') {
      // 移到主屏幕
      this.refs.lockScreen.changeToMain();
    }
  }

  handleMouseMove() {
    if(this.state.status != 'close') {
      this.openScreen();
    }
  }

 /**
 * 开启屏幕
 * @return {[type]} [description]
 */
  openScreen() {
    clearInterval(this.state.leaveInterval);
    this.setState({
      status: 'lock',
      leaveTime: 0
    })
    this.refs.mask.open();
    this.refs.lockScreen.open();
  }

  /**
   * 关闭屏幕
   * @return {[type]} [description]
   */
  closeScreen() {
    clearInterval(this.state.leaveInterval);
    this.setState({
      status: 'close',
      leaveTime: 0
    });
    this.refs.mask.close(this.refs.lockScreen.changeToMain.bind(this.refs.lockScreen));
    this.refs.lockScreen.close();
  }

  /**
   * 准备休眠
   * @return {[type]} [description]
   */
  prepareClose() {
    if(this.state.status != 'close') {
      this.state.leaveInterval = setInterval(() => {
        console.log('leave...' + this.state.leaveTime)
        this.setState({
          leaveTime: this.state.leaveTime + 1
        });
        if(this.state.leaveTime == CLOSE_TIME - 5) {
          this.refs.mask.prepareClose();
        }else if(this.state.leaveTime == CLOSE_TIME) {
          this.closeScreen();
        }
      }, 1000);
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
        <div className={style.screen} onMouseUp={this.prepareClose.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseLeave={this.prepareClose.bind(this)}>
          <Desktop />
          <LockScreen ref="lockScreen"/>
          <Mask ref="mask" />
        </div>
        <a className={style.home} onMouseDown={this.handleHome.bind(this)} onMouseUp={this.prepareClose.bind(this)}></a>
      </div>
    );
  }
}

export default App;
