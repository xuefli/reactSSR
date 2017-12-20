import * as Express from 'express';
import * as React from 'react';

import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import { StaticRouter } from 'react-router';
// import { IArticle } from '../data';

// import { DataReducer } from '../reducers/data/DataReducer';
import { AppState, reducer } from '../../client/reducers/index';

import Hello from '../../client/hello';

export default async function render(req: Express.Request, res: Express.Response) {
    console.log(req.url);
    // const dataReducer = new DataReducer<IArticle>();
    // let reducer = dataReducer.reducer;
    //await reducer.fetch("/article");
    let newState = {
      data: ['item1', 'item2', 'item3']
    }

    console.log(JSON.stringify(newState));
    const store = createStore<AppState>(reducer, newState);
    // store.dispatch({type: 'load', payLoad: newState.data})
    const context = {};
    console.log(JSON.stringify(store.getState()));
    
    const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Hello/>
          </StaticRouter>
        </Provider>,
      );
      console.log(JSON.stringify(store.getState()));
        res.send(renderFullPage(content, store.getState()));
}

function renderFullPage(html: string, preloadedState: object) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            // window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
            window.myData = ${JSON.stringify(preloadedState)}
          </script>
          <script type="text/javascript" src="/static/vendor.js"></script>
          <script type="text/javascript" src="/static/index.js"></script>
        </body>
      </html>
      `
  }