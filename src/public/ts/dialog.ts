export class Dialog {
	private dialog = document.getElementById('addPostDialog') as any;
	private closeButton = this.dialog.querySelector('.close');
	private form = this.dialog.querySelector('#postForm');

	constructor() {
		this.dialog.showModal();
		this.closeButton.addEventListener('click', () => this.dialog.close());
		this.form.addEventListener('submit', () => this.submit(), false);
	}

	private submit() {
		const data = {
			link: this.form.querySelector('#postLink').value,
			title: this.form.querySelector('#postTitle').value,
			creator: this.form.querySelector('#postCreator').value,
		};
		const http = new XMLHttpRequest();
		http.open("POST", `/post`, true);
		http.setRequestHeader("Content-type", "application/json");
		http.send(JSON.stringify(data));
		http.onreadystatechange = () => {
			if (http.readyState === 4 && http.status !== 200) {
				alert(JSON.parse(http.responseText).message);
			}
			this.dialog.close();
		};
	}
}
