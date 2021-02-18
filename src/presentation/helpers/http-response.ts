import { HttpResponse } from '@presentation/protocols/http-response';

export const ok = (data: any): HttpResponse => ({
  status: 200,
  data,
});

export const created = (data: any): HttpResponse => ({
  status: 201,
  data,
});

export const badRequest = (data: any): HttpResponse => ({
  status: 400,
  data,
});

export const unauthorized = (data: any): HttpResponse => ({
  status: 401,
  data,
});

export const forbidden = (data: any): HttpResponse => ({
  status: 403,
  data,
});

export const notFound = (data: any): HttpResponse => ({
  status: 404,
  data,
});

export const internalServerError = (data: any): HttpResponse => ({
  status: 500,
  data,
});
