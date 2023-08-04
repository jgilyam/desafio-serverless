import { AuthService } from "./application/auth.service";
import { AuthController } from "./infrastructure/auth.controller";
import { CognitoSevice } from "./infrastructure/cognito/cognito.service";

const USER_POOL = process.env.USER_POOL ?? "";
const USER_POOL_CLIENT = process.env.USER_POOL_CLIENT ?? "";

const cognitoSevice = new CognitoSevice(USER_POOL, USER_POOL_CLIENT);
const authService = new AuthService(cognitoSevice);
export const authController = new AuthController(authService);