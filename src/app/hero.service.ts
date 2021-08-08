import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'http://localhost:8080/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroById(idHero: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${idHero}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${idHero}`)),
      catchError(this.handleError<Hero>(`getHero id=${idHero}`))
    );
  }

  saveHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe();
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe();
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const idHero = typeof hero === 'number' ? hero : hero.idHero;
    const url = `${this.heroesUrl}/${idHero}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}