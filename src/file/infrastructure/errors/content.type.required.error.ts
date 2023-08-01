export class ContentTypeRequiredException extends Error{
    message: string;
    constructor() {
      super();
      this.message = "Content type is required"
    }
}