import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { UserRepository } from "../../domain/UserRepository";
import { UsersResponse } from "./UsersResponse";

export class UsersByCriteriaSearcher {
  constructor(private repository: UserRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<UsersResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    //const courses = await this.repository(criteria);

    return new UsersResponse([]);
  }
}
