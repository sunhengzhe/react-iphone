import React from 'react';
import style from './LockScreen.css';

const SCREEN_WIDTH = 346;

class LockScreen extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isDrag: false,
      position: -50,
      curPage: 'main'
    }
  }

  handleMouseDown(e) {
    this.setState({
      isDrag: true,
      startX: e.pageX
    });
  }

  changeToMain() {
    this.setState({
      isDrag: false,
      position: -50,
      curPage: 'main'
    });  
  }

  changeToPassword() {
    this.setState({
      isDrag: false,
      position: 0,
      curPage: 'password'
    }); 
  }

  handleMouseUp(e) {
    switch (this.state.curPage) {
      case 'main': 
        if(this.state.position > -36) {
          this.changeToPassword();
        }else{
          this.changeToMain();
        }
        break;
      case 'password':
        if(this.state.position < -20) {
          this.changeToMain();
        }else{
          this.changeToPassword();
        }
    }
  }

  handleMouseMove(e) {
    if(this.state.isDrag) {
      let curX = e.pageX;
      let moveDis = curX - this.state.startX;
      // 左滑为 - 右滑为 +
      let transDis = moveDis * 50 / SCREEN_WIDTH;
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
          position: transDis
        }) 
      }

    }
  }

  render() {
    let styleObj = {
      transform: 'translate(' + this.state.position + '%, 0)',
      background: 'rgba(0, 0, 0, ' + (this.state.position * 0.01 + 0.5) + ')',
      transition: this.state.isDrag ? '' : '0.5s'
    }
    return (
      <div className={style.lockScreen} onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
        onMouseLeave={this.handleMouseUp.bind(this)}>
        <div className={style.bgWrap}></div>
        <div className={style.lockWrap} style={styleObj}>
          <div className={style.pwdWrap + " wrap"}></div>
          <div className={style.mai  + " wrap"}>
            <div className={style.timeWrap}>
              <span>22:34</span>
            </div>
            <div className={style.dateWrap}>
              <span>3月3日</span> <span>星期四</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LockScreen;