import { MongoAnalyzesRepository } from '@/app/repositories/mongo/analyzes';
import { ActionSystemService } from '@/app/services/action-system';
import { ActionSystemPresenter } from '@/infra/presenters/action-system';

export class PresentersFactory {
  static makeDecisionsPresenter(): any {
    const analyzesRepository = new MongoAnalyzesRepository();
    const actionSystemService = new ActionSystemService(analyzesRepository);

    return new ActionSystemPresenter(actionSystemService);
  }
}
