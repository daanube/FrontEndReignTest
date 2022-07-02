import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Articles } from 'src/app/Models/Articles';                                             // Model import
import { Response } from 'src/app/Models/Response';                                             // Model import
import { ArticleService } from 'src/app/Services/articles.service';                             // Service import
import { NewsListComponent } from "src/app/NewsList/news-list/news-list.component";             // Component import

@Component({
  selector: 'app-news-selector',
  templateUrl: './news-selector.component.html',
  styleUrls: ['./news-selector.component.css']
})

export class NewsSelectorComponent implements OnInit {
  
  @ViewChild("appNewsList", {static: true}) NewsListComponentChild: NewsListComponent = new NewsListComponent();    
  // ViewChild referencing the news-list component, to pass the response as a parameter
  query: string="";                                                                             // variable declared to store the select value to pass it as parameter to the service
  apiResponse: Response = new Response;                                                         // variable declared to store the API response
  @Output() apiResponseChange = new EventEmitter<Response>();                                   // variable declared to tell the component that some change happened
  articlesList: Array<Articles>=[];                                                             // variable declared to store the array of articles from the API response

  constructor(
    private _articleService: ArticleService,                                                    // declaring the service in the constructor method
  ) { }

  ngOnInit(): void {
  }
  
  getApiResponse(e: string){                                                                    // method created to get the API response
    this.query = e;                                                                             // storing the value selected in the view
    this._articleService.getApiResponse(this.query).subscribe((response: Response) => {         // calling the service method to get the API response 
      this.apiResponse = response;                                                              // storing the API response
      this.articlesList = this.apiResponse.hits;                                                // storing the articles array

      this.articlesList.forEach(element => {
        if (element.author == null || element.author == "" || element.author == undefined
           || element.created_at == null || element.created_at == undefined
           || element.story_id == null || element.story_id == undefined
           || element.story_title == null || element.story_title == "" || element.story_title == undefined
           || element.story_url == null || element.story_url == "" || element.story_url == undefined
        ) {
            this.articlesList.splice(this.articlesList.indexOf(element),1);
        }
        // going through every element inside the array and looking for attributes that could be null, empty or undefined
        // if we find any, we look for its index in the array and then we remove it from such array.

        if (this.articlesList.find(x => x.story_id == element.story_id )) {
          this.articlesList.splice(this.articlesList.indexOf(element),1);
        }
        // going through every element inside the array to find any duplicated ids
        // if we find any, we look for its index in the array and then we remove it from such array.

      });

      this.apiResponse.hits = this.articlesList;                                               // assigning the articles array content back to the response object
      this.apiResponseChange.emit(this.apiResponse);                                           // telling the component that the API response got some changes
      this.updateBoard();                                                                      // calling the method that shows the articles on the component
     
    });
  }

  updateBoard() {
    this.NewsListComponentChild.initArticlesBoard(this.apiResponse);                           // calling the child component method that initialise the articles board everytime an option is selected
  }

}
