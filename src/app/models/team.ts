import { Activity } from './activity';

export interface Team {
  id?: string;
  name: string;
  createdBy: string;
  search: string[];
  users?: string[];
  activities?: Activity;
}
