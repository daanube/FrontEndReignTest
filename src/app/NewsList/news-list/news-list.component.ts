import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Articles } from 'src/app/Models/Articles';
import { Response } from 'src/app/Models/Response';
import { ArticleService } from 'src/app/Services/articles.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {
  @ViewChild("newsTopicSelect") newsTopicSelect: any;
  @Input() query: string="";
  @Input() articlesList: Array<Articles>=[];
  @Input() nbPages: number=0;
  @Input() hitsPerPage: number=0;
  @Input() apiResponse: Response = new Response;

  constructor(
    private _articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.initArticlesBoard(this.apiResponse);
  }

  initArticlesBoard(response: Response){
    this.articlesList = response.hits;
    // debugger;
  };

}
