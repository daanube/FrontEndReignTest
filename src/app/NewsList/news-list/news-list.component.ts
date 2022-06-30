import { Component, Input, OnInit } from '@angular/core';
import { Articles } from 'src/app/Models/Articles';
import { Response } from 'src/app/Models/Response';
import { ArticlesService } from 'src/app/Services/ArticlesService';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {
  @Input() articlesList: Array<Articles>[]=[];
  @Input() nbPages:number=0;
  @Input() hitsPerPage:number=0;
  response: Response = new Response;

  constructor(
    private articlesService: ArticlesService
  ) {
    
  }


  ngOnInit(): void {
  }


  getApiResponse(query:string=""){
    this.articlesService.getApiResponse(query)).subscribe(response => {
      this.articlesList = response.hits;
      this.nbPages =response.nbPages;
      this.hitsPerPage =response.hitsPerPage;
    })

  }
}
