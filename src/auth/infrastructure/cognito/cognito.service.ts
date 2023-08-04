import { CognitoIdentityServiceProvider } from "aws-sdk";
import { IIdentityHandler } from "../../domain/indentity.managet";


export class CognitoSevice implements IIdentityHandler{
    private cognito: CognitoIdentityServiceProvider;
    private userPool: string;
    private userPoolClient: string;

    constructor(userPool: string, userPoolClient: string){
        this.cognito = new CognitoIdentityServiceProvider();
        this.userPool = userPool;
        this.userPoolClient = userPoolClient;

    }
    getUserFromToken = async(token: string): Promise<string> => {
        
        const params = {AccessToken: token}

        const { Username: user } = await this.cognito.getUser(params).promise();

        return user;

    }
    authenticate = async(user: string, password: string): Promise<string> => {
        
        const params = {
            AuthFlow: "ADMIN_NO_SRP_AUTH",
            UserPoolId: this.userPool,
            ClientId: this.userPoolClient,
            AuthParameters: {
                USERNAME: user,
                PASSWORD: password,
            },
        }

        const { AuthenticationResult } = await this.cognito.adminInitiateAuth(params).promise();
        
        
        if(!AuthenticationResult || !AuthenticationResult.AccessToken) throw new Error("Auth failed");             

        const { AccessToken: accessToken } = AuthenticationResult;
        
        return accessToken;
    }

}