import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TeamsResponse } from '../interface/teams-response';
import { environment } from 'src/environments/environment';
import { Observable, of, expand, takeWhile, toArray, map, tap } from 'rxjs';
import { Team } from '../interface/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  // funkcija koja vraća Observable koji emitira sve timove iz svih stranica
/*   getAllTeams(): Observable<Team[]> {
    let teams: Team[] = [];     

    return this.getTeamsResponse(1).pipe(
      expand((response: TeamsResponse) => {
        // ako postoji sljedeća stranica, dohvatite je
        if (response.meta.next_page) {
          return this.getTeamsResponse(response.meta.next_page).pipe(
            tap((res) => {
              console.log('Fetched page:', res.meta.current_page);
              teams.push(...res.data);
            })
          );
        }
        // inače završite expand
        return of();
      }),
      takeWhile((response: TeamsResponse) => response.meta.next_page !== null),
      toArray(),
      map((responses: TeamsResponse[]) => {
        // izvuci sve timove iz svih odgovora
        for (const response of responses) {
          teams = [...response.data, ...teams]; // teams.push(...response.data);
        }
        return teams;
      })
    );
  }
 */
  
  // dohvaća cijeli odgovor (teams+meta) se pageNumber stranice
  getTeamsResponse(pageNumber: number = 1): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(environment.nbaBaseUrlTeams, {
      headers: new HttpHeaders()
        .set(
          environment.XRapidAPIHostHeaderName,
          environment.XRapidAPIHostHeaderValue
        )
        .set(
          environment.XRapidAPIKeyHeaderName,
          environment.XRapidAPIKeyHeaderValue
        ),
      params: new HttpParams().set('page', pageNumber),
    });
  }
}
