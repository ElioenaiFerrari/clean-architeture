import { HttpResponseProtocol } from '@presentation/protocols/http-response';

export const ok = (data: any): HttpResponseProtocol => ({
  status: 200,
  data,
});

export const created = (data: any): HttpResponseProtocol => ({
  status: 201,
  data,
});

export const badRequest = (data: any): HttpResponseProtocol => ({
  status: 400,
  data,
});

export const unauthorized = (data: any): HttpResponseProtocol => ({
  status: 401,
  data,
});

export const forbidden = (data: any): HttpResponseProtocol => ({
  status: 403,
  data,
});

export const notFound = (data: any): HttpResponseProtocol => ({
  status: 404,
  data,
});

export const internalServerError = (data: any): HttpResponseProtocol => ({
  status: 500,
  data,
});
