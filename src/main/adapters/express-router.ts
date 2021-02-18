import { PresenterProtocol } from '@presentation/protocols/presenter';
import { Request, Response, NextFunction } from 'express';

export const expressRouterAdapter = (presenter: PresenterProtocol) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const response = await presenter.handle(req.body);

    return res.status(response.status).json(response.data);
  };
};
