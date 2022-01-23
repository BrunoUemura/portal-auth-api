import RabbitmqServer from '@src/infra/queue/rabbitmq/RabbitmqServer';
import { IUserSignUp } from '@src/core/interface/UserInterfaces';

export default class PublishMessage {
  static async execute(queue: string, message: IUserSignUp) {
    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInQueue(queue, JSON.stringify(message));
  }
}
