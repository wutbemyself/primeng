import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ElementRef, AfterViewInit, DoCheck, OnDestroy, Input, Output, ViewChild, EventEmitter, IterableDiffers, Optional, NgZone } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';
import { PuductComponent } from './puduct/puduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboarddComponent } from './dashboardd/dashboardd.component';
import { enableProdMode } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { CaptchaModule } from 'primeng/captcha';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { DataTableModule } from "primeng/datatable";
import { RadioButtonModule } from "primeng/radiobutton";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { GrowlModule } from "primeng/growl";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

const appRoutes: Routes = [
  { path: '', component: DashboarddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: PuductComponent },
  { path: 'register', component: RegisterComponent },
  { path: '*', component: DashboarddComponent },
  { path: '**', component: DashboarddComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuductComponent,
    DashboarddComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
    CaptchaModule,
    ProgressSpinnerModule,
    CheckboxModule,
    CarouselModule,
    DialogModule,
    DragDropModule,
    PanelModule,
    DataTableModule,
    RadioButtonModule,
    BreadcrumbModule,
    GrowlModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
