import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private URL = "https://hn.algolia.com/api/v1/search_by_date?query="; // base url to get the articlesz
  constructor(
      private http : HttpClient
  ) { }

  getApiResponse (query : string = "") {                      // method that receives the parameter to look for the articles
      return this.http.get<any>(this.URL + `${query}` , {});  // creating the final url that we send to the API, and sending the query
    }
}
