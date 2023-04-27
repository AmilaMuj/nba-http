import { Component, OnInit } from '@angular/core';
import { TeamsResponse } from 'src/app/interface/teams-response';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamsResponse: TeamsResponse = {} as TeamsResponse; //da se inicijalizira prazan objekt tipa TeamsResponse
  currentPage = 1;
  perPage = 30;
  totalTeamsResponses = 0;

  constructor (private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.onGetTeamsResponse();
    // this.onGetAllTeams();
  }

/*   onGetAllTeams(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (response) => {
        this.teamsResponse.data = response;
        this.totalTeamsResponses = response.length; //
      },
      error: (error) => console.log(error),
      complete: () => console.log('Done retrieving teams.'),
    });
  } */

  onGetTeamsResponse(pageNumber: number = 1): void {
    this.teamsService.getTeamsResponse(pageNumber).subscribe({
      next: response => {
        this.teamsResponse = response;
        this.currentPage = response.meta.current_page;
        this.perPage = response.meta.per_page;
        this.totalTeamsResponses = response.meta.total_count;
      },
      error: error => console.log(error),
      complete:  () => console.log('Done retrieving teams response.')
    });
  }
}
