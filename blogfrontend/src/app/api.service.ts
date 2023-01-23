import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Article } from './article';
import { url } from 'inspector';
import { stringify } from 'querystring';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const apiUrl = 'http://localhost:3000/api/article';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl)
      .pipe(
        tap(article => console.log('fetched articles')),
        catchError(this.handleError('getArticles', []))
      );
  }

  getArticle(id: any): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    console.log(url);
    return this.http.get<Article>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(apiUrl, article, httpOptions).pipe(
      tap((art: Article) => console.log(`added article w/ id=${art._id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  updateArticle(id: any, article: Article): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  updateComments(id: any, articleNew: Article,articleOld:Article): Observable<any> {
    const url = `${apiUrl}/${id}`;
    let x= '';
    for(let i = 0;i < articleNew.comments.length;i++){
      x += articleNew.comments[i];
    }
    articleOld.comments.push(x);
    articleOld.bewertung.push(articleNew.bewertung[0]);
    return this.http.put(url, articleOld, httpOptions).pipe(
      tap(_ => console.log(`updated comments id=${id}`)),
      catchError(this.handleError<any>('updateComments'))
    );
  }

  deleteArticle(id : any){
    const url = `${apiUrl}/${id}`
    return this.http.delete(url,httpOptions).pipe(
      tap(_ => console.log(`delete article id=${id}`)),
      catchError(this.handleError<any>('deleteArticle'))
    );
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error:any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
