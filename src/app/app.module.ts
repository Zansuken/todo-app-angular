import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { HomeComponent } from './pages/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SettingsComponent,
    CreateTaskComponent,
    HomeComponent,
    TitleComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }