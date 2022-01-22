import { Client } from 'pg';

export default class Postgres {
  async connect() {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
    });
    await client.connect();
    return client;
  }

  async disconnect(client: Client) {
    await client.end();
  }
}
