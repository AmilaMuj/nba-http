import { Team } from './team';
import { NbaResponseMeta } from './nba-response-meta';

export interface TeamsResponse {
  data: Team[];
  meta: NbaResponseMeta;
}