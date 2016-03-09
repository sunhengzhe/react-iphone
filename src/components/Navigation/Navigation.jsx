import React from 'react';
import style from './Navigation.css';

class Navigation extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      signal: 4,
      theme: 'black',
      state: 'lock',
      opacity: 1
    }
  }

  changeTheme(position) {
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

  render() {

    return (
      <div className={style.navigation + ' ' + this.state.theme} style={{opacity: this.state.opacity}}>
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
        <div className={style.center}></div>
        <div className={style.right}>
          <span>71%</span>
        </div>
      </div>
    );
  }
}

export default Navigation;