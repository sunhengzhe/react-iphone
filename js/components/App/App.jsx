import React from 'react';
import style from './App.css';

const Mask = class extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      opacity: 1
    }
  }

  open() {
    this.setState({
      opacity: 0
    })
  }

  render(){
    let style = {
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      background: '#000000',
      opacity: this.state.opacity,
      transition: '0.5s'
    }
    return (
      <div style={style}></div>
    );
  }
}

const LockScreen = class extends React.Component {
  render(){
    return (
      <div>LockScreen</div>
    );
  }
}

const Desktop = class extends React.Component {
  render(){return (<div>Desktop</div>);}
}

class App extends React.Component {
  constructor(...args) {
    super(...args);
    // status [close, lock, unlock]
    this.state = {
      status: 'close'
    }
  }

  handleHome() {
    if(this.state.status == 'close') {
      // open the screen
      this.setState({
        status: 'lock'
      })
      this.refs.mask.open();
    }
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
          <Desktop />
          <LockScreen />
          <Mask ref="mask"/>
        </div>
        <div className={style.home} onMouseDown={this.handleHome.bind(this)}></div>
      </div>
    );
  }
}

export default App;
