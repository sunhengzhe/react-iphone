import React from 'react';
import style from './Desktop.css';

import AppManager from '../AppManager/AppManager.jsx';

const desktopApps = [
  {
    appname: "设置",
    appid: 'Setting'
  },
  {
    appname: '照片',
    appid: 'Picture'
  }
];

const bottomApps = [
  {
    appname: "电话",
    appid: 'Phone'
  },
  {
    appname: '信息',
    appid: 'Message'
  },
  {
    appname: '相机',
    appid: 'Camera'
  },
  {
    appname: 'Safari',
    appid: 'Safari'
  }
];

const SCREEN_WIDTH = 346;

class Desktop extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      startX: '',
      isDrag: false,
      totalPage: 3,
      pageIndex: 1,
      transPer: 0
    }
  }

 /**
 * 按下手指
 */
  handleMouseDown(e) {
    this.setState({
      isDrag: true,
      startX: e.pageX
    });
  }

/**
 * 滑动
 * @param  number 1:页数+1  -1:页数减1
 */
  slide(direct) {
    let endIndex = this.state.pageIndex + direct;
    if(endIndex <= 0 || endIndex >= this.state.totalPage - 1){
      endIndex = this.state.pageIndex;
    }
    this.setState({
      pageIndex: endIndex,
      transPer: 0,
      isDrag: false
    });
  }

  /**
 * 手指离开屏幕
 */
  handleMouseUp(e) {
    let transPer = this.state.transPer;
    // 滑动屏幕25%时切换页面
    // console.log(transPer, (25 / this.state.totalPage))
    if(transPer < -(20 / this.state.totalPage)) {
      this.slide(1);
    } else if(transPer > (25 / this.state.totalPage)) {
      this.slide(-1);
    } else {
      this.slide(0);
    }
  }

/**
 * 进入桌面
 * @return {[type]} [description]
 */
  enter() {
    if(!this.refs.appManager.isAppHere()){
      this.refs.curPage.style.transform = 'scale(1)';
      this.refs.toolPanel.style.transform = 'translate(0, 0)';
    }
  }

/**
 * 离开桌面
 * @return {[type]} [description]
 */
  leave() {
    this.refs.curPage.style.transform = 'scale(2)';
    this.refs.toolPanel.style.transform = 'translate(0, 100%)';
  }

  /**
   * 手指移动
   */
  handleMouseMove(e) {
    if(this.state.isDrag) {
      let curX = e.pageX;
      // 左滑为 - 右滑为 +
      let moveDis = curX - this.state.startX;
      // 移动的百分比数
      let transPer = moveDis * (100 / this.state.totalPage) / SCREEN_WIDTH;

      if(this.state.pageIndex == 1 || this.state.pageIndex == this.state.totalPage - 2) {
        transPer = transPer / 3;
      }
      this.setState({
        transPer: transPer
      });
    }
  }

  /**
   * 打开App
   * @param  {[type]} appid [description]
   * @return {[type]}       [description]
   */
  openApp(appid, index) {
    this.leave();
    this.refs.appManager.openApp(appid, index);
  }

  /**
   * 响应Home键
   * @return {[type]} [description]
   */
  answerHome() {
    if(!this.refs.appManager.hideApp()) {
      // 移动桌面至主屏幕
    }
  }

  render() {
    let desktopWrapStyle = {
      transform: 'translate(-' + (100 / this.state.totalPage * this.state.pageIndex - this.state.transPer) + '%, 0)',
      transition: this.state.isDrag ? '' : '0.5s'
    }

    return (
      <div className={style.desktop}>
        <div className={style.bgWrap}></div>
        <div className={style.desktopWrap} style={desktopWrapStyle}  onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
        onMouseLeave={this.handleMouseUp.bind(this)}>
          <div className={style.page}></div>
          <div className={style.page + ' curPage'} ref="curPage" >
            <div className={style.appWrap}>
              {
                desktopApps.map((item, index) => {
                  return (
                    <div key={index} className="iconWrap">
                      <div className="icon" style={{backgroundImage: 'url('+require(`../apps/${item.appid}/images/icon.png`)+')' }}
                        onClick={this.openApp.bind(this, item.appid, index)} ></div>
                      <div className="appname">{item.appname}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={style.page}></div>
        </div>
        <div className={style.indexWrap}>

        </div>
        <div className={style.toolWrap} ref="toolPanel">
          <div className={style.bottomWrap}>
          {
            bottomApps.map((item, index) => {
              return (
                <div key={index} className="iconWrap">
                  <div className="icon" style={{backgroundImage: 'url('+require(`../apps/${item.appid}/images/icon.png`)+')' }}></div>
                  <div className="appname">{item.appname}</div>
                </div>
              )
            })
          }
          </div>
        </div>
        <AppManager ref="appManager" enterDesktop={this.enter.bind(this)}/>
      </div>
    );
  }
}

export default Desktop;