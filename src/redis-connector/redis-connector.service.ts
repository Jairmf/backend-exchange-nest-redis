import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisConnectorService {
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        });
    }

    async set(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    async get(key: string): Promise<any> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }
}
