import { PresenterProtocol } from '@presentation/protocols/presenter';
import { Request, Response } from 'express';

export const expressRouterAdapter = (presenter: PresenterProtocol) => {
  return async (req: Request, res: Response) => {
    const response = await presenter.handle(req);

    return res.status(response.status).json(response.data);
  };
};
