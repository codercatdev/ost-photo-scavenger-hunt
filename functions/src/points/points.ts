import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const teamsWrite = functions.firestore.document('teams/{teamId}').onWrite(async (change, context) => {
  const { activities } = change.after.data() as any;
  if (activities) {
    // Get All activities that the team has submitted
    const promises: Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>[] = [];
    Object.keys(activities).forEach(activity => {
      promises.push(admin.firestore().doc(`activities/${activity}`).get());
    });
    const fullActivities = await Promise.all(promises);

    // Add Points
    let totalPoints = 0;
    fullActivities.forEach(activity => {
      const { points } = activity.data() as any;
      totalPoints = totalPoints + points;
    });

    // Update team points
    const ref = `teams/${context.params.teamId}`;
    console.log(`Updating ${ref} with ${totalPoints}`);
    return admin.firestore().doc(ref).set({totalPoints}, {merge: true});
  }else{
    return false;
  }
});
