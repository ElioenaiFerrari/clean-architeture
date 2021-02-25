import { HttpRequestProtocol } from '@presentation/protocols/http-request';
import { PresenterProtocol } from '@presentation/protocols/presenter';
import { Request, Response } from 'express';

export const expressRouterAdapter = (
  presenter: PresenterProtocol<HttpRequestProtocol>
) => {
  return async (req: Request, res: Response) => {
    const response = await presenter.handle({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    return res.status(response.status).json(response.data);
  };
};
