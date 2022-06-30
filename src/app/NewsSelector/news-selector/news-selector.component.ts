import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() apiResponseChange = new EventEmitter<Response>();
  
  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
  }
  
  // getApiResponse(query:string=""){
  getApiResponse(e: string){
    this.query = e;
    this._articleService.getApiResponse(this.query).subscribe((response: Response) => {
      this.apiResponse = response;
      this.apiResponseChange.emit(this.apiResponse);
      // debugger;

    });

  }

}
