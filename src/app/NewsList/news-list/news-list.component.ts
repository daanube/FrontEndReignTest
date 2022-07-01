import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  
  @Input() isFav: boolean = false;
  @Output() isFavChange = new EventEmitter<boolean>();

  favsArray: Array<Object>=[];
  stringifiedArray: any;
  
  constructor(
    private _articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.initArticlesBoard(this.apiResponse);
  }

  initArticlesBoard(response: Response){
    this.articlesList = response.hits;
    debugger;
    
  };

  toggleFav(e: any, id: number, fav: boolean) {
    // debugger;

    if (fav) {
      if (this.favsArray.indexOf(id) == -1 ) {
        this.favsArray.push(id);
        localStorage.setItem("favsArray",JSON.stringify(this.favsArray));
        console.log(this.favsArray);
        this.isFavChange.emit(this.isFav = fav);
        console.log(this.isFav);
      }

    } else {
      this.stringifiedArray = localStorage.getItem("favsArray");
      this.favsArray = [];
      this.favsArray = JSON.parse(this.stringifiedArray);
        // if (this.favsArray.findIndex(x => x == id) != -1) {
        if (this.favsArray.indexOf(id) != -1) {
          this.favsArray.splice(this.favsArray.findIndex(x => x == id))
        }
      console.log(this.favsArray);
      }
    }

}
