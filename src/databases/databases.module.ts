import { Global, Module, CacheModule } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import config from '../configEnvs';
import { ConfigType } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    // Config Mongo
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } =
          configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
    // Config REDIS
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      ttl: 1000,
    }),
  ],
  // hacemos que el API_KEY sea utilizado desde cualquier modulo
  exports: [MongooseModule, CacheModule],
})
export class DatabasesModule {}
