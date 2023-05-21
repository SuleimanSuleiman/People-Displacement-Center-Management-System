export default function HandleError(status:number, message:string):object {
    let error:any = new Error();
    error.status = status;
    error.message = message;
    return error;
}