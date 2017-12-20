import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Hello from './hello';
import preloadedState from './preload';
import { reducer, AppState } from './reducers/index';

// tslint:disable-next-line
const store = createStore<AppState>(reducer, preloadedState);
// store.dispatch({type: 'load', payLoad: preloadedState.data})

// console.log(`preloadedState: ${JSON.parse(preloadedState)}`)

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Hello />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);