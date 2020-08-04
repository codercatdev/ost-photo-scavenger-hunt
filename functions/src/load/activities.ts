import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const activities =
[
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Pack an outdoor picnic"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Pick berries and make homemade jam"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Schedule a time and go to your local zoo"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Volunteer at a charity for a day"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Shop at a local business"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Get a new hairdo"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Freeze frame jump"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Cook your favorite food that you normally take out"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Dance party"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Build a blanket fort"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Backyard camping with the fam"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Themed dinner night"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make a donation to a charity"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Mow \"OST\" into your lawn"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Backyard talent show"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Learn to juggle"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Build a house of cards"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Indoor obstical course"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Fancy dinner night (get DRESSED up!)"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Dye your hair"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Record a TikTok dance"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Recreate a childhood photo"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Cosplay as your favorite character"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Send someone a care package"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Construct a building out of food"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Do a science expirement"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Build a birdhouse"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Get your fam and form a human pyramid"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Finish a DIY project"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Bake a multi layered cake"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Break an apple in half with your hands"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "A family heirloom"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Take a 80s style portrait photo"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Go no waste for a day"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Recreate a meme"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Paint a room in your home a new color"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Recreate your favorite tv show or movie scene"
  },
  {
    "points": 10,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Reenact a famous painting"
  },
  {
    "points": 10,
    "location": ["Grand Rapids"],
    "activity": "Get some craft beer"
  },
  {
    "points": 10,
    "location": ["Grand Rapids"],
    "activity": "Go for a swim in Lake Michigan"
  },
  {
    "points": 10,
    "location": ["Grand Rapids"],
    "activity": "Walk around Frederik Meijer Gardens"
  },
  {
    "points": 10,
    "location": ["Detroit"],
    "activity": "Go for a swim in Lake Huron"
  },
  {
    "points": 10,
    "location": ["Detroit"],
    "activity": "Visit Belle Isle"
  },
  {
    "points": 10,
    "location": ["Detroit"],
    "activity": "Wave at Canada"
  },
  {
    "points": 10,
    "location": ["Minneapolis"],
    "activity": "Visit Carver Park Reserve"
  },
  {
    "points": 10,
    "location": ["Minneapolis"],
    "activity": "Go lawn bowling at Brit's Pub"
  },
  {
    "points": 10,
    "location": ["Minneapolis"],
    "activity": "Visit Minneapolis' chain of lakes"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Stop by an OST building"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Outdoor yoga"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Favorite coffee shop"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Fav happy hour hangout"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Go-to ice cream shop or truck"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Go to local farmers market"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Take your pup to the park"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make a bouquet with wildflowers"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Weird pet"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Cook a family recipe"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make homemade banana bread"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make your own sourdough starter"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Photoshop a photo"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Finish that home improvement project"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Play an instrument"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Have a pajama party"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Have a fashion show"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Have a paper airplane throwing contest"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Do some meal prep"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make origami"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make tie-dyed clothes"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Chubby bunny challenge"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Watermelon seed spitting contest"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Style your hair in a wacky way"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Paint your own nails"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Make s'mores"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Dress like a coworker"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Build a bonfire"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Bake a pie"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Pick up a new hobby"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Something that you've had since you were a kid"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Marie Kondo your closet and donate your clothes"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Go meatless for all your meals for a day"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Dress like a family member"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Do at home work out"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Paint a still life"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Plan a vacation"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Blindfolded makeover"
  },
  {
    "points": 5,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Do something NOBODY has ever done before"
  },
  {
    "points": 5,
    "location": ["Grand Rapids"],
    "activity": "Get lunch at the Bridge Street Market"
  },
  {
    "points": 5,
    "location": ["Grand Rapids"],
    "activity": "Walk across the Blue Bridge"
  },
  {
    "points": 5,
    "location": ["Grand Rapids"],
    "activity": "Visit La Grande Vitesse"
  },
  {
    "points": 5,
    "location": ["Detroit"],
    "activity": "Get groceries at the Eastern Market"
  },
  {
    "points": 5,
    "location": ["Detroit"],
    "activity": "Get tacos in South West Detroit"
  },
  {
    "points": 5,
    "location": ["Detroit"],
    "activity": "Go eat a coney dog"
  },
  {
    "points": 5,
    "location": ["Minneapolis"],
    "activity": "Walk Summit Ave"
  },
  {
    "points": 5,
    "location": ["Minneapolis"],
    "activity": "Go to the Minneapolis/St. Paul Farmer's Market"
  },
  {
    "points": 5,
    "location": ["Minneapolis"],
    "activity": "Get a Juicy Lucy"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "A wild animal in your neck of the woods"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Your favorite summer hang spot"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Bike on your favorite trail"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Embrace your inner-child and chill at a playground"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Walk at a local trail"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Head outside and draw a sketch of a landscape"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Create a work of art on the sidewalk (with chalk)"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Being socially distant and wearing a mask"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Morning coffee"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Pet dog"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Pet cat"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "House plant"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Movie night"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Favorite indoor chill spot"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Favorite quarantine purchase"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Show off your green thumb"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Play a board game"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "At home happy hour drink"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Desk setup"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Take a walk through your neighborhood"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "New favorite book"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Your self care routine"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Let your kid choose your outfit"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Send a letter to a friend"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Run through the sprinklers"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Find things in the clouds"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Go stargazing"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Play freeze tag"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Something plaid"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Catch fireflies"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Bake some cookies"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Merch from your favorite band"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Show you binge watched during quarantine"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Wear a monochromatic outfit"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Have a thumb war competition"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Finish a book"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Recycle your plastic grocery bags at the store"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Use some PTO and just chill"
  },
  {
    "points": 1,
    "location": ["Grand Rapids", "Detroit", "Minneapolis"],
    "activity": "Finish a puzzle"
  }
];


export const loadActivities = functions.https.onCall(async (data, context) => {
  const uid = context?.auth?.uid;

  if (uid !== 'I92Ve5kITrhebfo6w8VUJ7hYlxi2') {
    console.log('Sorry you are not admin@ajonp.com')
    return false;
  }
  console.log(`Logged in as ${uid}`);
  console.log(JSON.stringify(activities));

  const promises: any[] = [];
  activities.forEach((activity) => {
    const search = activity.activity.toLowerCase().split(' ')
    promises.push(admin.firestore().collection('activities').add({
      ...activity,
      search
    }));
  });
  return Promise.all(promises);
});
