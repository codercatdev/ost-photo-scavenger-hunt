import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';


const slackWebhook = functions.config().slack.webhook;

export const teamsWrite = functions.firestore.document('teams/{teamId}').onWrite(async (change, context) => {
  const { activities } = change.after.data() as any;
  if (activities) {
    // // Get All activities that the team has submitted
    const promises: Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>[] = [];
    Object.keys(activities).forEach(activity => {
      promises.push(admin.firestore().doc(`activities/${activity}`).get());
    });
    // const fullActivities = await Promise.all(promises);

    // // Add Points
    // let totalPoints = 0;
    // fullActivities.forEach(activity => {
    //   const { points } = activity.data() as any;
    //   totalPoints = totalPoints + points;
    // });

    // // Update team points
    // const ref = `teams/${context.params.teamId}`;
    // console.log(`Updating ${ref} with ${totalPoints}`);
    // return admin.firestore().doc(ref).set({totalPoints}, {merge: true});


    // Send resized link to slack
    const body = {
      "text": "Points: 10",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Budget Performance"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "_Points_:*10*"
          }
        },
        {
          "type": "image",
          "title": {
            "type": "plain_text",
            "text": "Points 10"
          },
          "block_id": "image4",
          "image_url": "https://firebasestorage.googleapis.com/v0/b/ost-photo-scavenger-hunt.appspot.com/o/hXiM2ACHU0LpMZ4uMN6O%2F0ssEoXkLh2PDSdgFJ1y3?alt=media&token=98e27a6f-ef74-40de-9694-0e37e28bfc5b",
          "alt_text": "An incredibly cute kitten."
        }
      ]
    }
    await fetch(slackWebhook, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    return true
  } else {
    return false;
  }
});

