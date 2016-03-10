import React from 'react';
import style from './Navigation.css';

class Navigation extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      signal: 4,
      theme: 'black',
      fontSize: 'big',
      opacity: 1,
      time: {}
    }
  }

  changeStyle(position) {
    if(position < -41) {
      this.setState({
        theme: 'black',
        opacity: -1 / 9 * position - 41 / 9
      });
    }else {
      this.setState({
        theme: 'white',
        opacity: 1 / 15 * position + 41 / 15
      });
    }
  }

  changeFontSize(size) {
    this.setState({
      fontSize: size
    })
  }

  changeTheme(theme) {
    this.setState({
      theme: theme
    })
  }

  /**
  * 改变时间
  */
  setClock(options) {
    this.setState({
      time: options
    })
  }

  render() {
    let fontSize = '';
    if(this.state.fontSize == 'big') {
      fontSize = '0.7em';
    }else if(this.state.fontSize == 'small') {
      fontSize = '0.6em';
    }

    let navStyle = {
      opacity: this.state.opacity,
      fontSize: fontSize
    }

    return (
      <div className={style.navigation + ' ' + this.state.theme} style={navStyle}>
        <div className={style.left}>
          <div className={style.signal + ' ' + style.left}>
            {
              (() => {
                var signals = [];
                for(var i = 0; i < 5; i++) {
                  if(i < this.state.signal) {
                    signals.push(<span key={i} className="fill"></span>);
                  }else {
                    signals.push(<span key={i}></span>);
                  }
                }
                return signals;
              })()
            }
          </div>
          <span className={style.service}>中国移动</span>
          <span className={style.internet}>4G</span>
        </div>
        <div className={style.time} style={{display: (this.state.fontSize == 'big' ? 'none' : 'block')}}>
          {this.state.time.hour + ':' + this.state.time.min}
        </div>
        <div className={style.right}>
          <span>71%</span>
        </div>
      </div>
    );
  }
}

export default Navigation;