import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import 'hammerjs';
import { ThingsModule } from './things/things.module';
import { ThingsSessionModule } from './things-session/things-session.module';
import { LoginComponent } from './account/login/login.component';

import { ThingsSessionService } from './shared/things-session.service';
import { TagsService } from './shared/tags.service';
import { ToastService } from './shared/toast.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    ThingsModule,
    ThingsSessionModule,
    SharedModule
  ],
  providers: [ThingsSessionService, TagsService, ToastService],
  bootstrap: [AppComponent],
  exports: [TopBarComponent, MaterialModule]
})
export class AppModule { }
