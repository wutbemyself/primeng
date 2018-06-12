import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
     }
 
    login(username: string, password: string) {
        // return this.http.post('/user/authenticate', JSON.stringify({ username: username, password: password }))
        return this.http.post('/api/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.token = user.token;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }
 
    logout() {
        // clear token remove user from local storage to log user out
        let curentUrl = this.router.routerState.snapshot.url;
        //console.log(returnUrl);
        this.token = null;
        localStorage.removeItem('currentUser');
        // this.router.navigate(['/login'], { queryParams: { returnUrl: curentUrl}});
        this.router.navigate(['/logout'], { queryParams: { returnUrl: curentUrl}});
    }
}