import { Activity } from './activity';

export interface Team {
  name: string;
  createdBy: string;
  search: string[];
  users?: string[];
  activities?: Activity;
}
