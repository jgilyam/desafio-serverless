import { APIGatewayProxyEventV2,  } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import {cognito} from './login'



export const handler = async (event: APIGatewayProxyEventV2) => {
  const routeArn = event["routeArn"];
  try {
    const {headers} =event
    const authorization = headers["authorization"];
    
    if (!authorization) {
      throw new Error('Authorization header missing');
    }
    
    const token = authorization.split(' ')[1];
    const data = await cognito.getUser({AccessToken: token}).promise();
    const { Username } = data
    
    // Verificar el rol del usuario o si tiene los permisos adecuados.

    return generatePolicy(Username, 'Allow', routeArn);
  } catch (error) {
    return generatePolicy('user', 'Deny', routeArn);
  }
};

export const generatePolicy = (principalId: string, effect: 'Allow' | 'Deny', resource: string) => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
}