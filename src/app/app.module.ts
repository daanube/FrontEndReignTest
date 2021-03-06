import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsListComponent } from './NewsList/news-list/news-list.component';
import { NewsSelectorComponent } from './NewsSelector/news-selector/news-selector.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArticleService } from './Services/articles.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NewsSelectorComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
