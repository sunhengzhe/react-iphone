import React from 'react';
import style from './Desktop.css';

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
      position: -33.33,
      totalPage: 3,
      pageIndex: 1,
      transPer: 0,
      scale: 2
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

  enter() {
    this.setState({
      scale: 1
    })
  }

  leave() {
    this.setState({
      scale: 2
    })
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

  render() {
    let desktopWrapStyle = {
      transform: 'translate(-' + (100 / this.state.totalPage * this.state.pageIndex - this.state.transPer) + '%, 0)',
      transition: this.state.isDrag ? '' : '0.5s',

    }

    let scareStyle = {
      transform: 'scale(' + this.state.scale + ')'
    }
    return (
      <div className={style.desktop}>
        <div className={style.bgWrap}></div>
        <div className={style.desktopWrap} style={desktopWrapStyle}  onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
        onMouseLeave={this.handleMouseUp.bind(this)}>
          <div className={style.page}></div>
          <div className={style.page} style={scareStyle}>
            <div className={style.appWrap}>
              {
                desktopApps.map((item, index) => {
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
          <div className={style.page}></div>
        </div>
        <div className={style.indexWrap}>

        </div>
        <div className={style.toolWrap}>
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
      </div>
    );
  }
}

export default Desktop;