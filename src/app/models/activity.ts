import { Activity } from './activity';
export interface Activity {
  id?: string;
  activity: string;
  points: number;
  location: string[];
}

export interface SubmittedActivity extends Activity{
  submitted: Activity;
}
