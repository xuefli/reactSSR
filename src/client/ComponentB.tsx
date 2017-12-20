import * as React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { AppState } from './reducers/index';


interface HelloProps {
    items?: Array<string>;
}

const mapStateToPropsParam: MapStateToPropsParam<HelloProps, {}, {}> = (appState: AppState) => {
    return {
        items: appState.data
    };
};

export  class B extends React.Component<HelloProps> {
    constructor(props: HelloProps) {
        super(props);
    }
    render() {
        console.log(this.props);
        let items = this.props.items;
    return (<div>is b Component
                {items !== undefined &&
          items.map((item, index) => {
              return <p key={index.toString()}>item ${item}</p>
          })

        }  

    </div>);
    }
}

export default connect(mapStateToPropsParam)(B);