import { Injectable } from '@angular/core';
import { Base_Reply, Request } from 'hapi';

import { Database } from '../../lib/database';
import { Endpoint } from '../endpoint';

@Injectable()
@Endpoint({
  handler: 'handle',
  method: 'GET',
  path: '/ping',
})
export class Ping {
	constructor(
		private db: Database,
	) { }

  public async handle(req: Request, res: Base_Reply): Promise<void> {
    res(null, 'pong!');
  }
}
