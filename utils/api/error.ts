export class CustomHttpError extends Error {
  status: number;

  constructor(status: number, message: any) {
    super(typeof message === 'string' ? message : JSON.stringify(message));
    this.status = status;
    this.name = 'CustomHttpError';
  }
}
