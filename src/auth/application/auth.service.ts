import { IIdentityHandler } from "../domain/indentity.managet";

export class AuthService{
    constructor(private readonly identityHandler: IIdentityHandler){}

    authenticate = async(email: string, password: string)=>{
        const token = await this.identityHandler.authenticate(email, password)
        return { token };
    }

    authorize = async(token: string)=>{
        const user = await this.identityHandler.getUserFromToken(token);
        return user;
    }
}