import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  users:Array<any>
  constructor(private _dataService : DataService){
    // // ยิงไปเพื่อเช็ค token
    // this._dataService.getUser().subscribe(res => 
    //   this.users = res 
    // );
  }
}
