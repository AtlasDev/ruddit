import { CreatePost } from './createPost';
import { GetPosts } from './getPosts';
import { Ping } from './ping';
import { VotePost } from './votePost';

export const endpoints = [
	{ useClass: CreatePost, provide: 'endpoints', multi: true },
	{ useClass: Ping, provide: 'endpoints', multi: true },
	{ useClass: VotePost, provide: 'endpoints', multi: true },
	{ useClass: GetPosts, provide: 'endpoints', multi: true },
];
