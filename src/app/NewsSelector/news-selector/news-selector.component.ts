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
  
  getApiResponse(e: string){
    debugger;
    this.query = e;
    this._articleService.getApiResponse(this.query).subscribe((response: Response) => {
      this.apiResponse = response;
      for (let i = 0; i < this.apiResponse.hits.length; i++) {
        const element = this.apiResponse.hits[i];
        if (element.author == null || element.created_at == null || element.story_id == null || element.story_title == null || element.story_url == null
          // || element.author === "" || element.story_title === "" || element.story_url === ""
        ) {
            this.apiResponse.hits.splice(this.apiResponse.hits.indexOf(element),1);
        }
        if (this.apiResponse.hits.find(x => x.story_id == element.story_id )) {
          this.apiResponse.hits.splice(this.apiResponse.hits.indexOf(element),1);
        }
      }

      // this.apiResponse.hits.forEach(element => {
      //   if (element.author === null || element.created_at === null || element.story_id === null || element.story_title === null || element.story_url === null
      //   // || element.author === "" || element.story_title === "" || element.story_url === ""
      //    ) {
      //       this.apiResponse.hits.splice(this.apiResponse.hits.indexOf(element),1);
      //   }
      //   if (this.apiResponse.hits.find(x => x.story_id == element.story_id )) {
      //     this.apiResponse.hits.splice(this.apiResponse.hits.indexOf(element),1);
      //   }
      // });

      this.apiResponseChange.emit(this.apiResponse);
      console.log(e);
      console.log(this.apiResponse);
    });
  }

}
