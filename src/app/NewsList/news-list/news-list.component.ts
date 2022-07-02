import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Articles } from 'src/app/Models/Articles';                                           // Model import
import { Response } from 'src/app/Models/Response';                                           // Model import

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

  @Input() apiResponse: Response = new Response;                                // variable declared to store the API response coming from the parent component
  @Input() articlesList: Array<Articles>=[];                                    // variable declared to store the array of articles coming from the parent component
  @Input() isFav: boolean = false;                                              // variable declared to store the value use to determine if an article is a favourite or not
  @Output() isFavChange = new EventEmitter<boolean>();                          // variable declared to tell the component that some change happened
  favsArray: Array<Object>=[];                                                  // variable declared to store the array of favorite articles
  stringifiedArray: any;                                                        // variable declared to store the array of favorite articles as a string to be sotre in the localStorage
  
  constructor() {
  }

  ngOnInit(): void {
    this.initArticlesBoard(this.apiResponse);                                   // calling the method that initialises the articles board
  }

  initArticlesBoard(response: Response){
    this.articlesList = [];                                                     // everytime we initialise the articles board, the articles array is initialised too 
    this.articlesList = response.hits;                                          // assigning the articles array form the parent component to the internal variable
  };

  toggleFav(id: number, fav: boolean) {                                         // method that stores in the localStorage the id of the favorite articles

    if (fav) {                                                                  // we receive a boolean variable and the id of the current article
      if (this.favsArray.indexOf(id) == -1 ) {                                  // if the value is 'true' and the id is not in the array already we add it
        this.favsArray.push(id);
        localStorage.setItem("favsArray",JSON.stringify(this.favsArray));       // the array is transformed into a string to be store in the localStorage
        this.isFavChange.emit(this.isFav = fav);                                // we tell the component that the variable changed
      }

    } else {                                                                    // if the value is 'false'
      this.stringifiedArray = localStorage.getItem("favsArray");                // we read the variable that stored the stringified array in the localStorage
      this.favsArray = [];                                                      // the favorites array is emptied
      this.favsArray = JSON.parse(this.stringifiedArray);                       // and we transform ths string back to an array, asignning it to the favorites array
      if (this.favsArray.indexOf(id) != -1) {                                   //  we llok for the id of the current article in the array  
        this.favsArray.splice(this.favsArray.indexOf(id), 1);                   // and it gets removed from it
      }
      }
    }

}
