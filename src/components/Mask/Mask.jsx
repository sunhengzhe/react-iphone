import React from 'react';

class Mask extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      opacity: 1,
      isDoing: false
    };
  }

  open() {
    if(this.state.isDoing) {
      return;
    }
    //正在打开
    this.setState({
      opacity: 0,
      isDoing: true
    }, () => {
    setTimeout(() => {
      this.refs.mask.style.display = 'none';
        this.setState({
          isDoing: false
        })
      }, 500);
    });
  }

  isDoing() {
    return this.state.isDoing;
  }

  close(callback) {
    console.log(this.state.isDoing);
    if(this.state.isDoing) {
      return;
    }
    this.refs.mask.style.display = 'block';
    this.refs.mask.style.opacity = '0';
    //正在关闭
    this.setState({
      isDoing: true
    }, () => {
      setTimeout(() => {
        this.setState({
          opacity: 1
        });
        setTimeout(() => {
          this.setState({
            isDoing: false
          });
          callback && callback();
        }, 500);
      }, 0);
    })
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