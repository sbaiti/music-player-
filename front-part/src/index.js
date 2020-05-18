import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'
import './assets/sass/style.scss';

const doc = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>, doc);

serviceWorker.unregister();
