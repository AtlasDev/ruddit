export class Post {
	public id: string;
	public title: string;
	public link: string;
	public createdAt: Date;
	public creator: string;
	public upvotes: number;

	constructor(post: IPost) {
		this.id = post.id;
		this.title = post.title;
		this.link = post.link;
		this.createdAt = new Date(post.createdAt);
		this.creator = post.creator;
		this.upvotes = post.upvotes;
	}

	public createElement(): string {
		return `<li class="mdl-list__item mdl-list__item--three-line">
			<span class="mdl-list__item-primary-content">
				<a class="material-icons mdl-list__item-avatar noselect" id="postUp-${this.id}">thumb_up</a>
				<a class="material-icons mdl-list__item-avatar noselect" id="postDown-${this.id}">thumb_down</a>
				<a target="_blank" href="${this.link}">${this.title}</a>
				<span class="mdl-list__item-text-body">
					(${this.upvotes} punten) Door: ${this.creator}. Om ${this.createdAt.toLocaleTimeString()}
				</span>
			</span>
		</li>`;
	}

	public registerEvents(): void {
		document.getElementById('postUp-' + this.id).addEventListener('click', (event) => {
			event.preventDefault();
			this.sendVote(true);
		});

		document.getElementById('postDown-' + this.id).addEventListener('click', (event) => {
			event.preventDefault();
			this.sendVote(false);
		});
	}

	private sendVote(up: boolean): void {
		const http = new XMLHttpRequest();
		http.open("POST", `/post/${this.id}`, true);
		http.setRequestHeader("Content-type", "application/json");
		http.send(JSON.stringify({
			upvote: up,
		}));
	}
}

export interface IPost {
	createdAt: Date;
	id: string;
	title: string;
	link: string;
	upvotes: number;
	creator: string;
}
