import { Action } from 'redux';

export type DataState = Array<string>;

export interface DataAction<T> extends Action {
    payLoad: T;
}

export interface LoadDataAction extends DataAction<DataState> {
    type: string;
}
export const initDataState: DataState = [];
export type RemoteAction = LoadDataAction;

export function reducer(state: DataState = initDataState, action: LoadDataAction): DataState {
    console.log(`reducer----------------- ${JSON.stringify(action)}`);
    let result:DataState = state;
    switch (action.type) {
        case 'load':
            result = [...state, ...action.payLoad];
            break;
        default:
            break;
    }
    return result;   
}
