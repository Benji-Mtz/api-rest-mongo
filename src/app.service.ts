import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  fakeString = 'my name is naveen';
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    const value = await this.cacheManager.get('myCustomKey');

    if (value) {
      return {
        data: value,
        loadsFrom: 'redis cache',
      };
    }
    await this.cacheManager.set('myCustomKey', this.fakeString);
    return {
      data: this.fakeString,
      loadsFrom: 'fake database',
    };
  }

  async getRedis() {
    const value = await this.cacheManager.get('myCustomKey');

    if (value) {
      return {
        data: value,
        loadsFrom: 'redis cache',
      };
    }
    return { message: 'no data' };
  }
}
