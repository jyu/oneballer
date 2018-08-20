import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import App from './app';
import registerServiceWorker from './framework/registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
