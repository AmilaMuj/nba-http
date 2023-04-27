import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GamesResponse } from '../interface/games-response';
import { environment } from 'src/environments/environment';
import { Observable, of, expand, map, takeWhile, tap, toArray, retry } from 'rxjs';
import { Game } from '../interface/game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  // funkcija koja vraća Observable koji emitira sve timove iz svih stranica (dobijem niz svih games do npr 101 stranice)
/*   getAllGames(): Observable<Game[]> {
    let games: Game[] = [];

    return this.getGamesResponse(1).pipe(
      expand((response: GamesResponse) => {
        if (response.meta.next_page && response.meta.next_page < 101) {
          return this.getGamesResponse(response.meta.next_page, response.meta.per_page).pipe(
            retry(2),
            tap((res) => {
              console.log('Fetched page:', res.meta.current_page);
              games.push(...res.data);
            })
          );
        }
        inače završite expand
        return of();
      }),
      takeWhile((response: GamesResponse) => response.meta.next_page !== null),
      toArray(),
      map((responses: GamesResponse[]) => {
        for (const response of responses) 
          games = [...response.data, ...games];

        return games;
      })
    );
  }
 */

  // dohvaća cijeli odgovor (games+meta) se pageNumber stranice
  getGamesResponse(pageNumber: number = 1, perPage: number = 25): Observable<GamesResponse> {
    return this.http.get<GamesResponse>(environment.nbaBaseUrlGames, {
      headers: new HttpHeaders()
        .set(
          environment.XRapidAPIHostHeaderName,
          environment.XRapidAPIHostHeaderValue
        )
        .set(
          environment.XRapidAPIKeyHeaderName,
          environment.XRapidAPIKeyHeaderValue
        ),
      params: new HttpParams().set('page', pageNumber).set('per_page', perPage),
    });
  }
}
