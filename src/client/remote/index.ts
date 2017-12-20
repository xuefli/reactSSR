import 'isomorphic-fetch';
// import IRequest from './IRequest';
import IResponse from './IResponse';

export async function get<T>(url: string) {
    let result: IResponse<T> = {code: 0};
    try {
        let response: Response = await fetch(url, {credentials: 'include'});
        let data: IResponse<T> = await response.json();
        result = data;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }

    return result;
}

export async function post<T>(url: string, headers: any, param: {}) {
    let result: IResponse<T> = {code: 0};
    try {
        let response: Response = await fetch(url, {
            credentials: 'include', 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', ...headers
            }, 
            body: JSON.stringify(param)});
        let data: IResponse<T> = await response.json();
        result = data;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }

    return result;
}
/* 
export async function postFormData<T>(url: string, headers: {}, param: FormData) {
    let result: IResponse<T> = {code: 0};
    try {
        let response: Response = await fetch(url, {
            credentials: 'include', 
            method: 'POST', 
            headers: headers, 
            body: param});
        let data: IResponse<T> = await response.json();
        result = data;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }

    return result;
}
 */