import { Component, Input, OnInit } from '@angular/core';
import { Articles } from 'src/app/Models/Articles';
import { Response } from 'src/app/Models/Response';
import { ArticleService } from 'src/app/Services/articles.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {
  @Input() articlesList: Array<Articles>=[];
  @Input() nbPages:number=0;
  @Input() hitsPerPage:number=0;
  apiResponse: Response = new Response;

  constructor(
    private _articleService: ArticleService
  ) {
    
  }


  ngOnInit(): void {
  }


  getApiResponse(query:string=""){
    this._articleService.getApiResponse(query).subscribe((response: Response) => {
      this.articlesList = response.hits;
      this.apiResponse.nbPages = response.nbPages;
      this.apiResponse.hitsPerPage = response.hitsPerPage;

      return this.apiResponse;
    });

  }
}
