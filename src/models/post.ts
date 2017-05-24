import { v4 } from 'node-uuid';

export class Post implements IPost {
	public id: string;
	public title: string;
	public link: string;
	public createdAt: Date;
	public creator: string;
	public upvotes: number;
	public isNew: boolean;

	constructor(post: IPost) {
		this.id = post.id || v4();
		this.title = post.title;
		this.link = post.link;
		this.createdAt = post.createdAt || new Date();
		this.creator = post.creator;
		this.upvotes = post.upvotes;
		this.isNew = post.isNew || false;
	}

	public async upvote(): Promise<void> { this.upvotes++; }

	public async downvote(): Promise<void> { this.upvotes--; }

	public export(): IPost {
		return {
			id: this.id,
			title: this.title,
			creator: this.creator,
			link: this.link,
			upvotes: this.upvotes,
			createdAt: this.createdAt,
		};
	}

	public async save(conn: any): Promise<object> {
		if (this.isNew === true) {
			this.isNew = false;
			return conn.table('posts').insert(this.export());
		} else {
			return conn.table('posts').get(this.id).update(this.export());
		}
	}
}

export interface IPost {
	createdAt?: Date;
	id?: string;
	title: string;
	link: string;
	upvotes: number;
	creator: string;
	isNew?: boolean;
}
