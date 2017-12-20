import { Action } from 'redux';
import { get } from '../../remote';

export type  DataState<T> = Array<T>;

export interface DataAction<T> extends Action {
    payLoad: Array<T>;
}

export class DataReducer<T> {
    private data: DataState<T> = [];
    public initState():DataState<T> {
        return this.data;
    }

    public reducer(state: DataState<T> = [], action: DataAction<T>): DataState<T> {
        let result: DataState<T> = [];
        switch (action.type) {
            case "load":
                result = [...state, ...action.payLoad];
                break;
        
            default:
                break;
        }
        return result;
    }

    public async fetch(url: string) {
        let response = await get<DataState<T>>(url);
        if (response.code === 0 && response.data) {
            this.data = response.data;
        }
    }
}
