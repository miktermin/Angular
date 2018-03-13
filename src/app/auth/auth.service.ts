import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
	token: string;

	constructor(private router: Router) {
	}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch((error) => {
				console.log(error);
			});
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => firebase.auth().currentUser.getIdToken())
			.then((token: string) => {
				this.router.navigate(['/']);
				localStorage.setItem('token', JSON.stringify(token));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	logout() {
		firebase.auth().signOut()
			.then(() => {
				this.router.navigate(['/signin']);
				localStorage.setItem('token', '');
			});
	}

	getToken() {
		return this.token;
	}

	isAuthenticated() {
		return !!localStorage.getItem('token');
	}
}
