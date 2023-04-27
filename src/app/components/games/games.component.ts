import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesResponse } from 'src/app/interface/games-response';
import { GamesService } from 'src/app/service/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  gamesResponse: GamesResponse = {} as GamesResponse; //da se inicijalizira prazan objekt tipa GamesResponse
  currentPage = 1;
  perPage = 25;
  totalGamesResponses = 0;

  constructor (private gamesService: GamesService) {}

  ngOnInit(): void {
    this.onGetGamesResponse();
    // this.onGetAllGames();
  }

/*   onGetAllGames(): void {
    this.gamesService.getAllGames().subscribe({
      next: response => {
        this.gamesResponse.data = response;
        this.totalGamesResponses = response.length;
      },
      error: error => console.log(error),
      complete: () => console.log('Done retrieving games.')
    });
  } */

  onGetGamesResponse(pageNumber: number = 1, perPage: number = 25): void {
    this.gamesService.getGamesResponse(pageNumber, perPage).subscribe({
      next: response => {
        this.gamesResponse = response;
        this.currentPage = response.meta.current_page;
        this.perPage = response.meta.per_page;
        this.totalGamesResponses = response.meta.total_count;
      },
      error: error => console.log(error),
      complete:  () => console.log('Done retrieving games response.')
    });
  }
}
