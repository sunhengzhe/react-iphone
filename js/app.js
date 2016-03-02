import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import App from './components/App/App.jsx';

const Mask = class extends React.Component {
  unlock() {
    console.log('unlock!')
  }

  render(){
    let style = {
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      background: '#000000'
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

const NoMatch = class extends React.Component {
  render(){return (<div></div>);}
}

ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Mask} onLeave={Mask.unlock} />
        <Route path="lockScreen" component={LockScreen} />
        <Route path="desktop" component={Desktop} />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>,
    document.getElementById('container')
)