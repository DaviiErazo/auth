import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { RecipientsResponse } from "../RecipientsResponse";
import { RecipientsByCriteriaSearcher } from "./RecipientsByCriteriaSearcher";
import { SearchRecipientsByCriteriaQuery } from "./SearchRecipientsByCriteriaQuery";

export class SearchRecipientsByCriteriaQueryHandler
  implements QueryHandler<SearchRecipientsByCriteriaQuery, RecipientsResponse>
{
  constructor(private searcher: RecipientsByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchRecipientsByCriteriaQuery.name;
  }

  handle(query: SearchRecipientsByCriteriaQuery): Promise<RecipientsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
