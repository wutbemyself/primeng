import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Navigation } from 'selenium-webdriver';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _dataService: DataService, public router: Router) {
  }
  Fdata: any = {}
  users: any
  datatest = '';
  authtoken: any
  user: any
  
  ngOnInit() {
    this.Fdata = {
      user: 'user',
      pwd: '123456'
    };
  }

  submit() {
    this._dataService.Login(this.Fdata).subscribe(response => {
      debugger
      var data = JSON.parse(response['response']);
      if (data.status == 200) {
        console.log('login Success');
        this.datatest = data.data.token;
        sessionStorage.setItem('authen', data.data.token)
        sessionStorage.setItem('user', JSON.stringify(data.data.data))
        this.authtoken = data.token
        this.user = data;
        this.router.navigate(['deshboard']);
      }
    });
  }



}
