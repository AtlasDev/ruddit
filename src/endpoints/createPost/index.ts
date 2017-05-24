import { Injectable } from '@angular/core';
import { badRequest } from 'boom';
import { Base_Reply, Request } from 'hapi';
import * as Joi from 'joi';
import * as url from 'url';

import { Database } from '../../lib/database';
import { Post } from '../../models/post';
import { Endpoint } from '../endpoint';

// tslint:disable-next-line:max-line-length
const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

@Injectable()
@Endpoint({
  handler: 'handle',
  method: 'POST',
  path: '/post',
  config: {
    validate: {
      payload: {
				title: Joi.string().min(2).max(50).required(),
        link: Joi.string().min(5).max(50).regex(linkRegex).required(),
        creator: Joi.string().min(3).max(20).required(),
      },
    },
  },
})
export class CreatePost {
	private allowedDomains = [
		'atlasdev.nl',
		'google.nl',
		'google.com',
		'youtube.com',
		'reddit.com',
		'i.imgur.com',
		'i.redd.it',
		'gfycat.com',
	];

	constructor(
		private db: Database,
	) { }

  public async handle(req: Request, res: Base_Reply): Promise<void> {
		const hostname = url.parse(req.payload.link).hostname;
		if (this.allowedDomains.indexOf(hostname) === -1) {
			res(null, badRequest('Host not allowed.'));
			return;
		}
    const post = new Post({
      title: req.payload.title,
      link: req.payload.link,
      creator: req.payload.creator,
			upvotes: 1,
      isNew: true,
    });
    await post.save(this.db.conn);
    res(null, post.export());
  }
}
