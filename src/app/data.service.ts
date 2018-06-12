import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  result: any;

  constructor(private _http: Http) { }
  getUser() {
    return this._http.get('/api/users').map(
      result => this.result = result.json().data
    );
  }

  Register(data) {
    let Header = new Headers();
    Header.append("Content-Type", "application/json");
    return this._http.post('/api/users/register', data, { headers: Header }).map(result =>
      result['_body'] || { resultCode: 500, data: this.result.json().data, message: 'Register failed.' }
    );
  }

  Login(data) {
    let Header = new Headers();
    Header.append("Content-Type", "application/json");
    return this._http.post('/api/users/authenticate', data, { headers: Header }).map((result: Response) => {
      debugger
      
      let user = result.json();
      if (user) {
        localStorage.setItem('authen', user.data.token)
        localStorage.setItem('user', JSON.stringify(user.data.data))
      }
      localStorage
      return user;
      // result['_body'] || { resultCode: 500, data: this.result.json().data, message: 'password failed.' }
    });
  }
}
