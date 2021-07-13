import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { Filters } from '../../../Shared/domain/criteria/Filters';
import { Order } from '../../../Shared/domain/criteria/Order';
import { RecipientRepository } from '../../domain/RecipientRepository';
import { RecipientsResponse } from '../RecipientsResponse';

export class RecipientsByCriteriaSearcher {
  constructor(private repository: RecipientRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<RecipientsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const recipients = await this.repository.matching(criteria);

    return new RecipientsResponse(recipients);
  }
}
