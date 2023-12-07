import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';


/**
 * Service for interacting with the MySQL database using a connection pool.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {}

  /**
   * Lifecycle hook that is called once the module containing this service is fully initialized.
   * It creates a new connection pool to the database with the configuration provided.
   */
  async onModuleInit(): Promise<void> {
    try {
      this.pool = createPool({
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        user: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      await this.pool.getConnection();
      console.log(
        `Successfully conneected to ${this.configService.get<string>('DB')}`,
      );
    } catch (error) {
      console.log(
        `Failed to connect to ${this.configService.get<string>('DB')}`,
      );
    }
  }

  /**
   * Lifecycle hook that is called when the application is shutting down.
   * It closes all connections in the pool.
   */
  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  /**
   * Executes the given SQL query using the established database connection pool.
   *
   * @param {string} sql - The SQL query to execute.
   * @param {any[]} [params] - An array of parameters to be bound to the query.
   * @returns {Promise<any>} A promise that resolves with the query results.
   */
  async query(sql: string, params?: any[]): Promise<any> {
    const [results] = await this.pool.execute(sql, params);
    return results;
  }
}
