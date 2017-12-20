export default interface IResponse<T> {
    code: number;
    codeMsg?: string;
    data?: T;
}