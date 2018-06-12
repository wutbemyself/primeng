import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboardd',
  templateUrl: './dashboardd.component.html',
  styleUrls: ['./dashboardd.component.css']
})
export class DashboarddComponent implements OnInit {
  ShowProductKeen = true;
  ShowProductVwash = false;
  display: boolean = false;
  user: any
  // =========================================================
  msgs: any[];
  userform: FormGroup;
  submitted: boolean;
  genders: any[];
  description: string;
  // =========================================================
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.user = 'เข้าสู่ระบบ';
    this.ShowProductKeen = true;
    if (sessionStorage.getItem('authen')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.user + ' logging...');
    };

    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'description': new FormControl(''),
      'gender': new FormControl('', Validators.required)
    });

    this.genders = [];
    this.genders.push({ label: 'Select Gender', value: '' });
    this.genders.push({ label: 'Male', value: 'Male' });
    this.genders.push({ label: 'Female', value: 'Female' });
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    this.display = true;
    
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

  logout() {
    if (sessionStorage.getItem('authen')) {
      (this.user ? this.user : this.user = '')
      console.log(this.user + ' logout...');
      sessionStorage.removeItem('authen');
      sessionStorage.removeItem('user');
      this.user = '*';
    }
  }

  ShowProduct(PD) {
    if (PD == 'VW') {
      this.ShowProductVwash = true;
      this.ShowProductKeen = false;
    } else {
      this.ShowProductKeen = true;
      this.ShowProductVwash = false;
    }

  }

}
