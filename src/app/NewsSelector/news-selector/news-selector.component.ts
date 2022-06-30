import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Articles } from 'src/app/Models/Articles';
import { Response } from 'src/app/Models/Response';
import { ArticleService } from 'src/app/Services/articles.service';
@Component({
  selector: 'app-news-selector',
  templateUrl: './news-selector.component.html',
  styleUrls: ['./news-selector.component.css']
})

export class NewsSelectorComponent implements OnInit {
  
  @ViewChild("newsTopicSelect") newsTopicSelect: any;
  @Input() query: string="";
  @Input() articlesList: Array<Articles>=[];
  @Input() nbPages: number=0;
  @Input() hitsPerPage: number=0;
  apiResponse: Response = new Response;

  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
  }
  
  // getApiResponse(query:string=""){
  getApiResponse(e: string){
    debugger;
    this.query = e;
    this._articleService.getApiResponse(this.query).subscribe((response: Response) => {
      this.articlesList = response.hits;
      this.apiResponse.nbPages = response.nbPages;
      this.apiResponse.hitsPerPage = response.hitsPerPage;

      return this.apiResponse;
    });

  }

}
