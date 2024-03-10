## Sample express.js app

### Getting started

### Web server

1. This app uses Firestore as backend with the firebase-admin npm, so it requires the google serviceAccountKey.json file to be downloaded from the Firebase console. Please place in a safe location and set the GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to its location. See instructions to generate the file and set the environment variable [here](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments). This project uses `dotenv`, so see .env.sampe file for reference.
2. Run locally as: `npm start` or in debug mode: `DEBUG=app:* npm start`
3. Browse to http://localhost:3000


### Data import script

From the project root folder (so it can read google credentials file):
1. node scripts/import_sentences.js scripts/sentences.jsonl.600.txt

(*) Please note that importing the 20,000 sentences file will exceed the free Firebase quota allocation.

### Word ranking script

From the project root folder (so it can read google credentials file):
1. node scripts/word_ranking.js


### TODO

- English translation with Yandex
- Count the top 100 words across all sentences
- Bonus: API authentication
- Bonus: Tests
- Bonus: Host the app on Railway or a similar platform
