import React from 'react';
import style from './App.css';

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locked: true,
      closed: true
    }
  }

  handleHome() {
    this.setState({
      closed: false
    });
    location.href = '#lockScreen';
  }

  render() {
    return (
      <div className={style.phone}>
        <div className={style.tool}>
          <div className={style.ccd}></div>
          <div className={style.camera}></div>
          <div className={style.receiver}></div>
        </div>
        <div className={style.screen}>
          {this.props.children}
        </div>
        <div className={style.home} onMouseDown={this.handleHome.bind(this)}></div>
      </div>
    );
  }
}

export default App;
