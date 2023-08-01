export class BodyRequiredException extends Error{
    message: string;
    constructor() {
      super();
      this.message = "Body type is required"
    }
}