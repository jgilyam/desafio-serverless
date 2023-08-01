export class WrongTypeExcepetion extends Error{
    message: string;
    constructor(allowedType: string) {
      super();
      this.message = `Only ${allowedType} type files are allowed to be uploaded`
    }
}