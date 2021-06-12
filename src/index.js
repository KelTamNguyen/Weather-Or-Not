import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import actions from "./actions"


ReactDOM.render(
  <App todos={actions} />,
  document.getElementById('root')
);

