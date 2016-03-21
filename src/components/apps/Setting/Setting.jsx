import React from 'react';
import BaseApp from '../BaseApp/BaseApp.jsx';
import style from './Setting.css';

import ListItem from './ListItem.jsx';

class Setting extends BaseApp {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={`app ${style.setting}`}>
        <div className={style.title}>
          <h1>设置</h1>
        </div>
        <div className={style.content}>
          <div className={style.searchBox}>
            <input className={style.searchInput} type="text" />
          </div>

          <div className={style.listWrap}>
            <ListItem name="飞行模式" />
            <ListItem name="Wi-Fi" />
            <ListItem name="蓝牙" />
            <ListItem name="蜂窝移动网络" />
            <ListItem name="个人热点" />
            <ListItem name="VPN" />
            <ListItem name="运营商" />
          </div>
          <div className={style.listWrap}>
            <ListItem name="通知" />
            <ListItem name="控制中心" />
            <ListItem name="勿扰模式" />
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;