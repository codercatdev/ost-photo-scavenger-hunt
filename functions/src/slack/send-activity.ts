import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';


const slackWebhook = functions.config().slack.webhook;

export const sendActivity = functions.firestore.document('teams/{teamId}').onWrite(async (change, context) => {
  const id = context.params.teamId;
  const name = change.after.data()?.name;
  const newActivities = change.after.data()?.activities
  const oldActivities = change.before.data()?.activities;

  if (newActivities) {
    // Get All activities that the team has submitted
    for (const [newKey, a] of Object.entries(newActivities) as any) {
      // Check to see if resizeURL exists
      if (Object.keys(a).includes('resizeURL')) {
        //Find old entry
        for (const [oldKey, b] of Object.entries(oldActivities) as any) {
          if (newKey === oldKey) {
            // Make sure old key does not have a resize
            if (!Object.keys(b).includes('resizeURL')) {
              const activity = await admin.firestore().doc(`activities/${newKey}`).get();
              const data = activity.data() as { activity: string, points: number };
              await slackWebApi(id, name, data.points, data.activity, a.resizeURL);
            }
          }
        }
      }
    }
  }
});

async function slackWebApi(id:string, name:string, points: number, activity: string, url: string) {
  // Send resized link to slack
  const body = {
    "text": `Points ${points}`,
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": activity
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `_Points_:*${points}*`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `<https://ost-photo-scavenger-hunt.web.app/team/${id}|${name}>`
        }
      },
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": activity
        },
        "block_id": "image4",
        "image_url": url,
        "alt_text": activity
      }
    ]
  }
  const response: any = await fetch(slackWebhook, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.Response.error) {
    console.log(response.Response.error);
  }
}
