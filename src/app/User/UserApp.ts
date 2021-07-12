import container from "./dependency-injection";
import { Definition } from 'node-dependency-injection';
import { Server } from "./server";
import { EventBus } from "../../modules/Shared/domain/EventBus";
import { DomainEventSubscriber } from "../../modules/Shared/domain/DomainEventSubscriber";
import { DomainEvent } from "../../modules/Shared/domain/DomainEvent";
import { DomainEventMapping } from "../../modules/Shared/infrastructure/EventBus/DomainEventMapping";

export class UserApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || "5000";
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus;
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}

