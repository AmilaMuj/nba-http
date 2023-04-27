import { Game } from "./game";
import { NbaResponseMeta } from "./nba-response-meta";

export interface GamesResponse {
  data: Game[];
  meta: NbaResponseMeta;
}