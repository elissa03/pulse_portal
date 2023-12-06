import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {}

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
        `Successfully conneected to ${this.configService.get<string>(
          'DB',
        )}`,
      );
    } catch (error) {
      console.log(
        `Failed to connect to ${this.configService.get<string>('DB')}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const [results] = await this.pool.execute(sql, params);
    return results;
  }
}
