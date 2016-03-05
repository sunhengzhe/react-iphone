import React from 'react';

class Mask extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      opacity: 1
    };
  }

  open() {
    this.setState({
      opacity: 0
    });
    setTimeout(() => {
      this.refs.mask.style.display = 'none';
    }, 500);
  }

  close(callback) {
    this.setState({
      opacity: 1
    });
    setTimeout(() => {
      this.refs.mask.style.display = 'block';
      callback && callback();
    }, 500);
  }

  prepareClose() {
    this.refs.mask.style.display = 'block';
    setTimeout(() => {
      this.setState({
        opacity: 0.5
      });
    }, 500);
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
      transition: '0.5s ease-out'
    }
    return (
      <div style={style} ref="mask"></div>
    );
  }
}

export default Mask;