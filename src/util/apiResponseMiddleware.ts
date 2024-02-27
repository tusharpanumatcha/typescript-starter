import { Response } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ApiResponseMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    req.apiResponse = {
      ok: (data?: any) => this.ok(res, data),
      badRequest: (errors: string | string[] = []) =>
        this.badRequest(res, errors),
      unauthorized: (error?: string) => this.unauthorized(res, error),
      forbidden: () => this.forbidden(res),
      notFound: () => this.notFound(res),
      unsupportedAction: () => this.unsupportedAction(res),
      invalid: (errors: string | string[] = []) => this.invalid(res, errors),
      serverError: (error?: string | Error) => this.serverError(res, error),
      requireParams: (params: string | string[]) =>
        this.requireParams(req, res, params, next),
      requireHeaders: (headers: string | string[]) =>
        this.requireHeaders(req, res, headers, next),
      created: (data?: any) => this.created(res, data),
    };

    next();
  }

  private ok(res: Response, data?: any) {
    this.jsonResponse(res, data, { status: HttpStatus.OK });
  }

  private badRequest(res: Response, errors: string | string[]) {
    errors = Array.isArray(errors) ? errors : [errors];
    const body = {
      message: this.statusMessage(HttpStatus.BAD_REQUEST),
      errors,
    };
    this.jsonResponse(res, body, { status: HttpStatus.BAD_REQUEST });
  }

  private unauthorized(res: Response, error?: string) {
    const body = {
      message: this.statusMessage(HttpStatus.UNAUTHORIZED),
      error,
    };
    this.jsonResponse(res, body, { status: HttpStatus.UNAUTHORIZED });
  }

  private forbidden(res: Response) {
    const body = { message: this.statusMessage(HttpStatus.FORBIDDEN) };
    this.jsonResponse(res, body, { status: HttpStatus.FORBIDDEN });
  }

  private notFound(res: Response) {
    const body = { message: this.statusMessage(HttpStatus.NOT_FOUND) };
    this.jsonResponse(res, body, { status: HttpStatus.NOT_FOUND });
  }

  private unsupportedAction(res: Response) {
    const body = { message: this.statusMessage(HttpStatus.METHOD_NOT_ALLOWED) };
    this.jsonResponse(res, body, { status: HttpStatus.METHOD_NOT_ALLOWED });
  }

  private invalid(res: Response, errors: string | string[]) {
    errors = Array.isArray(errors) ? errors : [errors];
    const body = {
      message: this.statusMessage(HttpStatus.UNPROCESSABLE_ENTITY),
      errors,
    };
    this.jsonResponse(res, body, { status: HttpStatus.UNPROCESSABLE_ENTITY });
  }

  private serverError(res: Response, error?: string | Error) {
    let err = { message: '', stacktrace: '' };
    if (error instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      err = { message: error.message, stacktrace: error.stack };
    }
    const body = {
      message: this.statusMessage(HttpStatus.INTERNAL_SERVER_ERROR),
      err,
    };
    this.jsonResponse(res, body, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  private requireParams(
    req: any,
    res: Response,
    params: string | string[],
    next: () => void,
  ) {
    const missing = this.checkRequiredParams(req, params);
    if (missing.length) {
      this.badRequest(res, missing);
    } else {
      next();
    }
  }

  private requireHeaders(
    req: any,
    res: Response,
    headers: string | string[],
    next: () => void,
  ) {
    const missing = this.checkRequiredHeaders(req, headers);
    if (missing.length) {
      this.badRequest(res, missing);
    } else {
      next();
    }
  }

  private created(res: Response, data?: any) {
    this.jsonResponse(res, data, { status: HttpStatus.CREATED });
  }

  private jsonResponse(res: Response, body: any, options: { status: number }) {
    options = options || { status: HttpStatus.OK };
    res.status(options.status).json(body || null);
  }

  private statusMessage(status: number) {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.METHOD_NOT_ALLOWED:
        return 'Unsupported Action';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Validation Failed';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      case HttpStatus.CREATED:
        return 'Created';
      default:
        return '';
    }
  }

  private checkRequiredParams(req: any, params: string | string[]) {
    params = Array.isArray(params) ? params : [params];
    return params.filter((param) => !this.hasRequestParam(req, param));
  }

  private checkRequiredHeaders(req: any, headers: string | string[]) {
    headers = Array.isArray(headers) ? headers : [headers];
    return headers.filter((header) => !this.hasRequestHeader(req, header));
  }

  private hasRequestParam(req: any, param: string) {
    return (
      (req.body && Object.prototype.hasOwnProperty.call(req.body, param)) ||
      (req.params && Object.prototype.hasOwnProperty.call(req.params, param)) ||
      Object.prototype.hasOwnProperty.call(req.query, param)
    );
  }

  private hasRequestHeader(req: any, header: string) {
    return (
      req.headers && Object.prototype.hasOwnProperty.call(req.headers, header)
    );
  }
}
