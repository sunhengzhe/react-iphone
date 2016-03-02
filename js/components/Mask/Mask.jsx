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
    setTimeout(function(){
      this.refs.mask.style.display = 'none';
    }.bind(this), 500);
  }

  close() {
    this.setState({
      opacity: 1
    });
    setTimeout(function(){
      this.refs.mask.style.display = 'block';
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