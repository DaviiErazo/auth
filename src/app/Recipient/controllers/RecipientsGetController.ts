import { Request, Response } from "express";
import httpStatus from "http-status";
import { RecipientsResponse } from "../../../modules/Recipients/application/RecipientsResponse";
import { SearchRecipientsByCriteriaQuery } from "../../../modules/Recipients/application/SearchByCriteria/SearchRecipientsByCriteriaQuery";
import { Recipient } from "../../../modules/Recipients/domain/Recipient";
import { QueryBus } from "../../../modules/Shared/domain/QueryBus";
import { Controller } from "./Controller";

type FilterType = { value: string; operator: string; field: string };
export class RecipientsGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const { query: queryParams } = _req;

    let { filters, orderBy, order, limit, offset } = queryParams;
    
    const query = new SearchRecipientsByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );

    const queryResponse: RecipientsResponse = await this.queryBus.ask(query);

    res.header("Access-Control-Allow-Origin", "*");
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.recipients));
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

  private toResponse(recipients: Array<Recipient>) {
    return recipients.map((recipient) => ({
      id: recipient.id.toString(),
      email: recipient.email.props.value,
      name: recipient.name.props.value,
    }));
  }
}
