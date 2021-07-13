import { Criteria } from "../../Shared/domain/criteria/Criteria";
import { Recipient } from "./Recipient";

export interface RecipientRepository {
  save(recipient: Recipient): Promise<void>;
  matching(criteria: Criteria): Promise<Array<Recipient>>;
}
