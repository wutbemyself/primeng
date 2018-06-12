import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication/authentication.service';
import 'rxjs/Rx';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class Request {

	constructor(public http: Http, private authenticationService: AuthenticationService
		, private router: Router) {

	}

	private updateTokenFormSmafBE(token) {
		if (token) {
			var currentUser = JSON.parse(localStorage.getItem('currentUser'));
			this.authenticationService.token = token;
			if (currentUser) {
				currentUser['token'] = token;
				localStorage.setItem('currentUser', JSON.stringify(currentUser));
			}
		}
	}

	get(url, data): Promise<any> {
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			let obj = data[key];
			if (obj.constructor == Array) {
				for (var i = 0; i < obj.length; i++) {
					params.append(key, obj[i]);
				}
			} else {
				params.set(key, obj);
			}
		}
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		let options = new RequestOptions({ headers: headers });
		options.search = params;
		return this.http.get(url, options).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error);
		}).toPromise();
	}

	get_raws(url, param): Promise<any> {
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		let options = new RequestOptions({ headers: headers });
		return this.http.get(url + (param ? ('?' + param) : ''), options).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error);
		}).toPromise();
	}

	post(url, data): Promise<any> {
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		return this.http.post(url, data, { headers: headers }).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error.json());
		}).toPromise();
	}

	put(url, data): Promise<any> {
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		return this.http.put(url, data, { headers: headers }).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			return Observable.throw(error.json());
		}).toPromise();
	}

	delete(url): Promise<any> {
		//console.log(JSON.stringify(data));
		/*
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			let obj = data[key];
			if (obj.constructor == Array) {
				for (var i = 0; i < obj.length; i++) {
					params.append(key, obj[i]);
				}
			} else {
				params.set(key, obj);
			}
		}
		*/
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		let options = new RequestOptions({ headers: headers });
		// options.search = params;
		return this.http.delete(url, options).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error.json());
		}).toPromise();
	}

	delete2(url, data): Promise<any> {
		//console.log(JSON.stringify(data));
		/*
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			let obj = data[key];
			if (obj.constructor == Array) {
				for (var i = 0; i < obj.length; i++) {
					params.append(key, obj[i]);
				}
			} else {
				params.set(key, obj);
			}
		}
		*/
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			params.set(key, data[key]);
		}
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		let options = new RequestOptions({ headers: headers });
		options.params = params;
		return this.http.delete(url, options).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error.json());
		}).toPromise();
	}

	getElement(data): Promise<any> {
		var urlBase = '/api/common/element';
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			params.set(key, data[key]);
		}
		let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		let options = new RequestOptions({ headers: headers });
		options.search = params;

		return this.http.get(urlBase, options).map(response => {
			this.updateTokenFormSmafBE(response.headers.get('token'));
			return response.json() || { resultCode: 50000, resultDescription: "No response from server" };
		}).catch((error: Response | any) => {
			if (error.status == 401) {
				this.authenticationService.logout();
			}
			return Observable.throw(error.json());
		}).toPromise();
	}

	getDataFile(url, data, queryOption) {
		let params: URLSearchParams = new URLSearchParams();
		for (let key in data) {
			params.set(key, data[key]);
		}
		//let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
		//let options = new RequestOptions({ headers: headers });
		//params.set('Authorization', 'Bearer ' + this.authenticationService.token);
		//options.search = params;
		window.open(url + '?filter=' + data.filter + (queryOption && queryOption.page && queryOption.limit ? ('&page=' + queryOption.page + '&limit=' + queryOption.limit) : '') + '&token=' + this.authenticationService.token);
	}

	getAllDataFile(url) {
		let params: URLSearchParams = new URLSearchParams();
		window.open(url + '?token=' + this.authenticationService.token);
	}

}