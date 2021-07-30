import httpStatus from "http-status";
import { Request, Response } from "express-serve-static-core";

import { User } from "../../../modules/Users/domain/User";
import { QueryBus } from "../../../modules/Shared/domain/QueryBus";
import { Controller } from "./Controller";
import { SearchUsersByCriteriaQuery } from "../../../modules/Users/application/SearchByCriteria/SearchUsersByCriteriaQuery";
import { UsersResponse } from "../../../modules/Users/application/SearchByCriteria/UsersResponse";

type FilterType = { value: string; operator: string; field: string };
export class UsersGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const { query: queryParams } = _req;
    const { filters, orderBy, order, limit, offset } = queryParams;
    console.log(filters, orderBy, order, limit);

    const query = new SearchUsersByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );

    const queryResponse: UsersResponse = await this.queryBus.ask(query);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.users));
  }

  private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (!params) {
      return new Array<Map<string, string>>();
    }

    return params.map((filter) => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ["field", field],
        ["operator", operator],
        ["value", value],
      ]);
    });
  }

  private toResponse(users: Array<User>) {
    return users.map((user) => ({
      id: user.id.toString(),
      email: user.email.props.value,
      username: user.username.props.value,
    }));
  }
}
