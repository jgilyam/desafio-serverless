import { APIGatewayProxyEventV2 } from "aws-lambda"
import { ApiResponse } from "../../common/api.response"
import { ApiErrorResponse, ApiErrorResponseImpl } from "../../common/exception.response"
import { HttpCode } from "../../common/http.codes"
import { BodyRequiredException } from "./errors/body.requerid.error"
import { ContentTypeRequiredException } from "./errors/content.type.required.error"
import { WrongTypeExcepetion } from "./errors/wrong.type.error"

export class FileErrorHandler {
    constructor(){}
    handleError = (error: Error, event: APIGatewayProxyEventV2): ApiResponse =>{
        const{method, path} = event.requestContext.http
        
        let detail = error.message
        let code = "file000"
        let httpCode = HttpCode.INTERNAL_SERVER_ERROR
        const instance = `${method} ${path}`;
        
        
        let errorResponse : ApiErrorResponse = new ApiErrorResponseImpl(Error.name, httpCode, detail, instance, code);
    
        if (error instanceof BodyRequiredException){
            code = "file001"
            httpCode = HttpCode.BAD_REQUEST
            errorResponse = new ApiErrorResponseImpl(BodyRequiredException.name, httpCode, detail, instance, code)
        }

        if (error instanceof ContentTypeRequiredException){
            code = "file002"
            httpCode = HttpCode.BAD_REQUEST
            errorResponse = new ApiErrorResponseImpl(ContentTypeRequiredException.name, httpCode, detail, instance, code)
        }

        if (error instanceof WrongTypeExcepetion){
            code = "file003"
            httpCode = HttpCode.BAD_REQUEST
            errorResponse = new ApiErrorResponseImpl(WrongTypeExcepetion.name, httpCode, detail, instance, code)
        }
      
        return new ApiResponse(httpCode, errorResponse);
    }
}