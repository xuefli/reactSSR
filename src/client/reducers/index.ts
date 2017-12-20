import { combineReducers } from 'redux';

import { DataState, initDataState, reducer as DataReducer } from './data';

export type AppState = {
    data: DataState;
}
export const appState: AppState = {
    data: initDataState
}

export const reducer = combineReducers<AppState>({
    data: DataReducer
});


