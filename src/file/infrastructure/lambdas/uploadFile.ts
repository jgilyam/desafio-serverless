import {APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context} from 'aws-lambda';
import { fileController } from "../../file.dependencies";


export const handler = async(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
  const {statusCode, result} = await fileController.uploadFile(event);
  
  const response : APIGatewayProxyResultV2 = {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result, undefined, 2)
  }
  return response;
}
