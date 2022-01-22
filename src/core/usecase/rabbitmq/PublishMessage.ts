import RabbitmqServer from '../../../infra/queue/rabbitmq/RabbitmqServer';
import { IUserSignUp } from '../../interface/UserInterfaces';

export default class PublishMessage {
  static async execute(queue: string, message: IUserSignUp) {
    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInQueue(queue, JSON.stringify(message));
  }
}
