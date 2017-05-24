import '../../../node_modules/material-design-lite/material.js';

import { Client } from 'nes';

import { Dialog } from './dialog';
import { Post } from './models/post';

class View {
	private posts: Post[];
	private ws = new Client('ws://' + location.host);

	constructor() {
		document.getElementById('addPost').addEventListener('click', () => new Dialog());
		this.ws.connect((err) => this.ws.onUpdate = (update) => this.dataUpdate(update));
		this.getPosts();
	}

	private dataUpdate(update): void {
		if (update.table === 'posts') {
			if (update.data.old_val && update.data.new_val) {
				// Update
				for (let i = 0; i < this.posts.length; i++) {
					if (this.posts[i].id === update.data.new_val.id) {
						this.posts[i] = new Post(update.data.new_val);
					}
				}
			} else if (!update.data.old_val) {
				// Insert
				this.posts.push(new Post(update.data.new_val));
			} else {
				// Delete
				for (let i = 0; i < this.posts.length; i++) {
					if (this.posts[i].id === update.data.old_val.id) delete this.posts[i];
				}
			}
		}
		this.rerender();
	}

	private getPosts(): void {
		const http = new XMLHttpRequest();
		http.open("GET", '/post');

		http.onreadystatechange = () => {
			if (http.readyState === 4 && http.status === 200) {
				this.posts = [ ];
				for (const post of JSON.parse(http.response)) {
					this.posts.push(new Post(post));
				}
				this.rerender();
			}
		};
		http.send();
	}

	private rerender(): void {
		document.getElementById('mainList').innerHTML = '';
		this.posts.sort((one, two) => two.upvotes - one.upvotes);
		for (let i = 0; i < this.posts.length; i++) {
			document.getElementById('mainList').innerHTML += this.posts[i].createElement();
			this.posts[i].registerEvents();
		}
	}
}

const view = new View();
