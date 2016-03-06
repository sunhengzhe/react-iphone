import React from 'react';
import style from './LockScreen.css';
import bgUrl from './images/lock.jpg';

const SCREEN_WIDTH = 346;
const PASSWORD = '0218';

class LockScreen extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isDrag: false,
      isDoing: false,
      position: -50,
      curPage: 'main',
      bgWidth: SCREEN_WIDTH,
      password: '',
      time: {}
    };
    this.keyTexts = [
      {num: '1', en: ''},
      {num: '2', en: 'A B C'},
      {num: '3', en: 'D E F'},
      {num: '4', en: 'G H I'},
      {num: '5', en: 'J K L'},
      {num: '6', en: 'M N O'},
      {num: '7', en: 'P Q R S'},
      {num: '8', en: 'T U V'},
      {num: '9', en: 'W X Y Z'},
      {num: '0', en: ''}
    ];
  }

/**
 * 锁屏中按下手指
 */
  handleMouseDown(e) {
    this.setState({
      isDrag: true,
      startX: e.pageX
    });
  }

  /**
  * 改变时间
  */
  setClock(options) {
    this.setState({
      time: options
    })
  }

/**
 * 锁屏切换到主屏幕
 */
  changeToMain() {
    this.setState({
      isDrag: false,
      position: -50,
      curPage: 'main',
      password: ''
    });
  }

/**
 * 锁屏切换到密码屏幕
 */
  changeToPassword() {
    this.setState({
      isDrag: false,
      position: -25,
      curPage: 'password'
    });
  }

/**
 * 手指离开屏幕
 */
  handleMouseUp(e) {
    switch (this.state.curPage) {
      case 'main':
        // 判断是否需要切换屏幕
        if(this.state.position > -42) {
          this.changeToPassword();
        }else{
          this.changeToMain();
        }
        break;
      case 'password':
        if(this.state.position < -38) {
          this.changeToMain();
        }else{
          this.changeToPassword();
        }
    }
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
      let transDis = moveDis * 25 / SCREEN_WIDTH;
      if(this.state.curPage == 'main') {
        if(transDis < 0) {
          transDis /= 2;
        }
        this.setState({
          position: -50 + transDis
        })
      }else if(this.state.curPage == 'password') {
        if(transDis > 0) {
          transDis /= 2;
        }
        this.setState({
          position: -25 + transDis
        })
      }

    }
  }

  /**
   * 输入密码
   */
  enterPassword(num) {
    this.setState({
      password: this.state.password + num
    }, () => {
      if(this.state.password.length == 4) {
        // 检查密码
        if(this.state.password == PASSWORD) {
          // 解除锁屏
          this.unlock();
        } else {
          // 密码错误
          var curClass = this.refs.circleBox.getAttribute('class');
          this.refs.circleBox.setAttribute('class', curClass + ' shake animated');
          setTimeout(() => {
            this.refs.circleBox.setAttribute('class', curClass);
            this.setState({
              password: ''
            })
          }, 1000)
        }
      }
    })
  }

  /**
   * 屏幕打开
   */
  open() {
    if(this.state.isDoing) {
      return;
    }
    this.setState({
      bgWidth: SCREEN_WIDTH * 1.1,
      isDoing: true
    });
    setTimeout(() => {
      this.setState({
        isDoing: false
      })
    }, 500);
  }

  /**
  * 屏幕解锁
  */
  unlock() {
    this.refs[this.state.curPage].style.transform = 'scale(0.5)';
    this.refs.lockScreen.style.opacity = '0';
    setTimeout(() => {
      this.refs.lockScreen.style.display = 'none';
    }, 500);
  }

  /**
  * 屏幕锁定
  */
  lock() {
    setTimeout(() => {
      this.refs.lockScreen.style.display = 'block';
      this.refs.lockScreen.style.opacity = '1';
      this.refs[this.state.curPage].style.transform = 'scale(1)';
      this.close();
    }, 500);
  }

  /**
   * 屏幕关闭
   */
  close() {
    if(this.state.isDoing) {
      return;
    }
    this.setState({
      bgWidth: SCREEN_WIDTH,
      isDoing: true
    });
    setTimeout(() => {
      this.setState({
        isDoing: false
      })
    }, 500);
  }

  /**
   * 删除上一位密码
   */
  cancel() {
    this.setState({
      password: this.state.password.slice(0, -1)
    })
  }

  render() {
    let bgOpacity = this.state.position * 0.02 + 1;
    let lockStyle = {
      transform: 'translate(' + this.state.position + '%, 0)',
      background: 'rgba(0, 0, 0, ' + bgOpacity + ')',
      transition: this.state.isDrag ? '' : '0.5s'
    }


    let bgStyle = {
      backgroundSize: this.state.bgWidth
    }

    return (
      <div className={style.lockScreen} onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
        onMouseLeave={this.handleMouseUp.bind(this)} ref="lockScreen">
        <div className={style.bgWrap} style={bgStyle}></div>
        <div className={style.lockWrap} style={lockStyle}>
          <div className="wrap"></div>
          <div className={style.pwdWrap + " wrap"} ref="password">
            <div className={style.info}>Touch ID 或输入密码</div>
            <div className={style.circleBox} ref="circleBox">
              <a className="circle" style={{background: this.state.password.length>0?'#fff':''}}></a>
              <a className="circle" style={{background: this.state.password.length>1?'#fff':''}}></a>
              <a className="circle" style={{background: this.state.password.length>2?'#fff':''}}></a>
              <a className="circle" style={{background: this.state.password.length>3?'#fff':''}}></a>
            </div>
            <div className={style.keyboard}>
              {
                this.keyTexts.map((item) => {
                  return (
                    <div key={item.num} className={style.key} onClick={this.enterPassword.bind(this, item.num)}>
                      <div className="num">
                        <span>{item.num}</span>
                      </div>
                      <div className="en">
                        <span>{item.en}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <span className={style.urgency}>紧急情况</span>
            <span className={style.cancel} onClick={this.cancel.bind(this)}>删除</span>
          </div>
          <div className={style.main  + " wrap"} ref="main">
            <div className={style.timeWrap}>
              <span>{this.state.time.hour}:{this.state.time.min}</span>
            </div>
            <div className={style.dateWrap}>
              <span>{this.state.time.month}月{this.state.time.day}日</span> <span>星期{this.state.time.week}</span>
            </div>
          </div>
          <div className="wrap"></div>
        </div>
      </div>
    );
  }
}

export default LockScreen;