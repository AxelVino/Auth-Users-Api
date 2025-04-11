export class NotFoundError extends Error {
  statusCode: number;

  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}
