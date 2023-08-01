import { APIGatewayProxyEventV2 } from "aws-lambda";

import {parseFormData} from "../../common/parseFormData"
import { HttpCode } from "../../common/http.codes";
import { FileService } from "../application/file.service";
import { ContentTypeRequiredException } from "./errors/content.type.required.error";
import { BodyRequiredException } from "./errors/body.requerid.error";
import { WrongTypeExcepetion } from "./errors/wrong.type.error";
import { FileErrorHandler } from "./file.error.handler.";

export class FileController {
  constructor(private readonly fileService: FileService, private readonly fileErrorHandler: FileErrorHandler) {}

  listFiles = async (event: APIGatewayProxyEventV2) => {
    const { queryStringParameters } = event;
    
    const query = queryStringParameters && queryStringParameters["name"];

    try {
      const response = await this.fileService.listFiles(query);;
      return {statusCode: HttpCode.OK, result: response};
    } catch (error) {
      return this.fileErrorHandler.handleError(error,event);
    }
  };

  uploadFile = async (event: APIGatewayProxyEventV2) => {
    const { body, headers } = event;
    const contentType = headers["content-type"];
    const allowedType = "text/csv"
  
    try {
      if (!contentType) throw new ContentTypeRequiredException();
      if (!body) throw new BodyRequiredException();

      const {filename, data, type} = parseFormData(body, contentType);

      if(type!==allowedType) throw new WrongTypeExcepetion(allowedType);

      const response = await this.fileService.uploadFile({filename, data});;
      return {statusCode: HttpCode.OK, result: response};
    } catch (error) {
      return this.fileErrorHandler.handleError(error,event);
    }
  };
}
