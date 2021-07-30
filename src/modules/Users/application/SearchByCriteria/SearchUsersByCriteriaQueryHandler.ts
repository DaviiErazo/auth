import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { Query } from "../../../Shared/domain/Query";
import { QueryHandler } from "../../../Shared/domain/QueryHandler";
import { SearchUsersByCriteriaQuery } from "./SearchUsersByCriteriaQuery";
import { UsersByCriteriaSearcher } from "./UsersByCriteriaSearcher";
import { UsersResponse } from "./UsersResponse";

export class SearchUsersByCriteriaQueryHandler implements QueryHandler<SearchUsersByCriteriaQuery, UsersResponse> {
  constructor(private searcher: UsersByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchUsersByCriteriaQuery.name;
  }

  handle(query: SearchUsersByCriteriaQuery): Promise<UsersResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
