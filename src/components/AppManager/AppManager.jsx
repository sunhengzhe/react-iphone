import React from 'react';

import Setting from '../apps/Setting/Setting.jsx';
import style from './AppManager.css';

class AppManager extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      appid: '',
      status: '',
      isAppHere: false
    }
  }

  isAppHere() {
    // isAppHere代表用户关闭app的时间，而appid在App动画关闭以后才清空
    return this.state.isAppHere;
  }

  /**
   * 打开App
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  openApp(appid, index) {
    this.setState({
      appid: appid,
      isAppHere: true
    });

    // 为了使App打开有css效果
    setTimeout(() => {
      this.setState({
        status: 'open'
      });
    }, 0)
  }

/**
 * 响应Home键，如果有App则关闭并返回true，否则返回false
 * @return {[type]} [description]
 */
  hideApp() {
    if(this.state.appid != '') {
      this.setState({
        status: '',
        isAppHere: false
      }, () => {
        this.props.enterDesktop();
      });
      // 为了使App有css效果
      setTimeout(() => {
        this.setState({
          appid: ''
        });
      }, 500);
      return true;
    }
    return false;
  }

  render() {
    return  (
      <div className={this.state.status}>
        {
          (() => {
            switch(this.state.appid) {
              case 'Setting':
                return <Setting />
              default:
                return ''
            }
          })()
        }
      </div>
    );
  }
}

export default AppManager;