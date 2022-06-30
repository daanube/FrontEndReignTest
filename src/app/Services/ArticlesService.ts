import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

    private URL = "https://hn.algolia.com/api/v1/search_by_date?query=";
    constructor(
        private http : HttpClient
    ) { }

    getApiResponse (query : string = "") {
        return this.http.get<any>(this.URL + `${query}` , {})
      }
}