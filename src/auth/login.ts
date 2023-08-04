import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {authController} from '../auth/auth.dependencies'

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    const {statusCode, result} = await authController.authenticate(event);

    const response: APIGatewayProxyResultV2 = {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result, undefined, 2),
      };
    
      return response;
    }




  