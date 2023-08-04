import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import AWS from 'aws-sdk';
import { RespondToAuthChallengeRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import authController from '../auth/auth.dependencies'

export const cognito = new AWS.CognitoIdentityServiceProvider();

const USER_POOL = process.env.USER_POOL ?? "";
const USER_POOL_CLIENT = process.env.USER_POOL_CLIENT ?? "";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    const {statusCode, result} = await authController.authenticate(event);

    const { body } = event
    if(!body) throw new Error("Body"); 
    const { email, password } = JSON.parse(body) as {email: string, password: string};
    console.log({ email, password })
    try {
        const result = await cognito
            .adminInitiateAuth({
                AuthFlow: "ADMIN_NO_SRP_AUTH",
                UserPoolId: USER_POOL,
                ClientId: USER_POOL_CLIENT,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                },
            })
                .promise();

                console.log(JSON.stringify(result, undefined, 2))
    
                if(!result.AuthenticationResult?.AccessToken) throw new Error("AccessToken");             
            
                //const data = await cognito.getUser({AccessToken: result.AuthenticationResult.AccessToken}).promise();
            
                
                
                const a = {...result.AuthenticationResult}
            
            
                console.log(JSON.stringify(a, undefined, 2))              
                        const response: APIGatewayProxyResultV2 = {
                            statusCode: 200,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(a, undefined, 2),
                          };
                        
                          return response;
        
    } catch (error) {
        const response: APIGatewayProxyResultV2 = {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({error}, undefined, 2),
          };
        
          return response;
    }

    export const handler = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
        const {statusCode, result} = await fileController.listFiles(event);
        
        const response: APIGatewayProxyResultV2 = {
          statusCode,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result, undefined, 2),
        };
      
        return response;
      };
    /*
    const{ ChallengeName, Session } = result         

    const asdasd: RespondToAuthChallengeRequest = {
        ClientId: USER_POOL_CLIENT,
        ChallengeName: ChallengeName ?? "",
        ChallengeResponses: {
            USERNAME: email,
            NEW_PASSWORD: "Warner1234!",
        },
        Session: Session

        
    }

    const b=await cognito.respondToAuthChallenge(asdasd).promise();
    */


};


  