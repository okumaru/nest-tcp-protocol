import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('SUPPLIER_SERVICE') private supplier: ClientProxy) {}

  async getHello(): Promise<string> {
    try {
      const sum = await lastValueFrom(
        this.supplier.send({ cmd: 'sum' }, [1, 2, 3, 4]),
      );

      console.log(sum);
    } catch (e) {
      console.error(e);
    }

    return 'Hello World!';
  }
}
