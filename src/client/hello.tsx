import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Loadable, { LoadingComponentProps } from 'react-loadable';
import A from './ComponentA';
import B from './ComponentB';
import D from './ComponentD';


const MyLoadingComponent = ({isLoading, error}: LoadingComponentProps) => {
    // Handle the loading state
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
    } else {
      return null;
    }
  };

// const AsyncA = Loadable({
//     loader: () => import('./ComponentA'),
//     loading: MyLoadingComponent
// });

// const AsyncB = Loadable({
//     loader: () => import('./ComponentB'),
//     loading: MyLoadingComponent
// });

const AsyncC = Loadable({
    loader: () => import('./ComponentC'),
    // modules: ['./ComponentC'],
    loading: MyLoadingComponent
});

export default class Hello extends React.Component {
    render() {
    return (
    <div>
        hello the world
        <ul>
            <li>
                <Link to="/a">click a</Link>
            </li>
            <li>
                <Link to="/b">click b</Link>
            </li>
            <li>
                <Link to="/c">click c</Link>
            </li>
            <li>
                <a href="/d">click d</a>
            </li>
        </ul>
        <Switch>
        <Route path="/a" component={A}/>
        <Route path="/b" component={B}/>
        <Route path="/c" component={AsyncC}/>
        <Route path="/d" component={D}/>
        </Switch>
    </div>);
    }
}
