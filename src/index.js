import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css';
import registerServiceWorker from './registerServiceWorker';
import './config'
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
