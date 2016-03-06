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
]

class Desktop extends React.Component {
  render() {
    let desktopWrapStyle = {
      transform: 'translate(-33.33%, 0)'
    }
    return (
      <div className={style.desktop}>
        <div className={style.bgWrap}></div>
        <div className={style.desktopWrap} style={desktopWrapStyle}>
          <div className={style.page}></div>
          <div className={style.page}>
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