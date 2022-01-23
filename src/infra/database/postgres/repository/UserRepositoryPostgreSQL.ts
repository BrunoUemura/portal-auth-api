import { User } from '@src/core/entity/User';
import UserRepository from '@src/core/repository/UserRepository';
import Postgres from '@src/infra/database/postgres/Postgres';

export default class UserRepositoryPostgreSQL implements UserRepository {
  async findOne(username: string): Promise<User | null> {
    const postgres = new Postgres();
    const database = await postgres.connect();
    const { rows }: any = await database.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
    );

    await postgres.disconnect(database);

    if (rows.length === 0) {
      return null;
    }

    return {
      id: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      password: rows[0].password,
      created_at: rows[0].created_at,
      updated_at: rows[0].updated_at,
    };
  }

  async insert(
    id: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const postgres = new Postgres();
    const database = await postgres.connect();
    await database.query(
      `INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)`,
      [id, username, email, password],
    );

    const user = await this.findOne(username);
    await postgres.disconnect(database);

    return user;
  }
}
