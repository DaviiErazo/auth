import StatusGetController from "../../controllers/StatusGetController";
import { UserPutController } from "../../controllers/UserPutController";
import { inMemoryCommandBus } from "../Shared/application";

const statusGetController = new StatusGetController();
const userPutController = new UserPutController(inMemoryCommandBus);

export { statusGetController, userPutController };