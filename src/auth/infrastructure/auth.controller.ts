import { APIGatewayProxyEventV2 } from "aws-lambda";
import { AuthService } from "../application/auth.service";
import { HttpCode } from "../../common/http.codes";


export class AuthController {

    constructor(private readonly authService: AuthService){}

    authenticate = async (event: APIGatewayProxyEventV2) => {
        try {
            const { body } = event
            if(!body) throw new Error("Body required"); 
            const { email, password } = JSON.parse(body) as {email: string, password: string};

            const response = await this.authService.authenticate(email, password);;
            return {statusCode: HttpCode.OK, result: response};
        } catch (error) {
            return {statusCode: HttpCode.UNAUTHORIZED, result: error};
        }
      };

      authorize = async(event: APIGatewayProxyEventV2)=>{
        const { headers } = event
        const authorization = headers["authorization"];
        
        if (!authorization) {
          throw new Error('Authorization header missing');
        }
        
        const token = authorization.split(' ')[1];
        
        const user = await this.authService.authorize(token);
        
        return user;

      }

}