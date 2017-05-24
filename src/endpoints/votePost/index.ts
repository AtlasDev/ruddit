import { Injectable } from '@angular/core';
import { Base_Reply, Request } from 'hapi';

import * as Joi from 'joi';

import { Database } from '../../lib/database';
import { Post } from '../../models/post';
import { Endpoint } from '../endpoint';

@Injectable()
@Endpoint({
  handler: 'handle',
  method: 'POST',
  path: '/post/{postId}',
  config: {
    validate: {
      params: {
        postId: Joi.string().required(),
      },
      payload: {
        upvote: Joi.boolean().required(),
      },
    },
  },
})
export class VotePost {
	constructor(
		private db: Database,
	) { }

  public async handle(req: Request, res: Base_Reply): Promise<void> {
    const dbPost = await this.db.conn.table('posts').get(req.params.postId).run();
    const post = new Post(dbPost);
    req.payload.upvote ? post.upvote() : post.downvote();
    await post.save(this.db.conn);
    res(null, post.export());
  }
}
