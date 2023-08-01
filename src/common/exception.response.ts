export interface ApiErrorResponse {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code?: string;
}

export class ApiErrorResponseImpl implements ApiErrorResponse {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code?: string | undefined;

  constructor(
    title: string,
    status: number,
    detail: string,
    instance: string,
    code?: string
  ) {
    this.type = undefined;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
    this.code = code;
  }
}
