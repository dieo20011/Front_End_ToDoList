import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_URL = 'https://newsapi.org/v2/everything';

  constructor(private readonly httpClient: HttpClient) {}

  public getNews(query: string, page: number = 10): Observable<NewsApiResponse> {
    const params = new HttpParams()
      .set('apiKey', environment.API_NEW_KEY)
      .set('q', query || 'bitcoin')
      .set('sortBy', 'publishedAt')
      .set('pageSize', page);

    return this.httpClient.get<NewsApiResponse>(this.API_URL, { params });
  }
}
