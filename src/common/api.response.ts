import { HttpCode } from "./http.codes"

export class ApiResponse {
    statusCode: HttpCode;
    result: any;
    headers;
    
    constructor( statusCode: HttpCode, result: any){
        this.statusCode = statusCode
        this.result = result;
        this.headers = {
            "Content-Type": "application/json"
          }
    }
}