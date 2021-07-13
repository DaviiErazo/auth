import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  subscribedTo(): String;
  handle(command: T): Promise<any>;
}
