import * as admin from 'firebase-admin';

admin.initializeApp();

export {
  loadActivities
} from './load/activities';

export {
  teamsWrite
} from './points/points';
