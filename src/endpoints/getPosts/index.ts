import { Injectable } from '@angular/core';
import { Base_Reply, Request } from 'hapi';

import { Database } from '../../lib/database';
import { Post } from '../../models/post';
import { Endpoint } from '../endpoint';

@Injectable()
@Endpoint({
  handler: 'handle',
  method: 'GET',
  path: '/post',
})
export class GetPosts {
	constructor(
		private db: Database,
	) { }

  public async handle(req: Request, res: Base_Reply): Promise<void> {
    res(null, await this.db.conn.table('posts').run());
  }
}
