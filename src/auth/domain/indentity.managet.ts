export interface IIdentityHandler{
    getUserFromToken(token: string): Promise<string>;
    authenticate(user: string, password: string): Promise<string>;
}