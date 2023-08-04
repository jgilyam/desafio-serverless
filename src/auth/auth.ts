import { APIGatewayProxyEventV2,  } from 'aws-lambda';
import { authController } from './auth.dependencies';



export const handler = async (event: APIGatewayProxyEventV2) => {
  const routeArn = event["routeArn"];
  try {
    
    const user = await authController.authorize(event);

    return generatePolicy(user, 'Allow', routeArn);
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