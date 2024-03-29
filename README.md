## Sample express.js app

### Getting started

### Web server

This is a single express app serving both the frontend and backend components, for simplicity. This could be easily separated.

1. This app uses Firestore as backend with the firebase-admin npm for node.js, so it requires the google serviceAccountKey.json file to be downloaded from the Firebase console. Please place in a safe location and set the GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to its location. See instructions to generate the file and set the environment variable [here](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments). This project uses `dotenv`, so see .env.sampe file for reference.
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

- Import script: Implemented but for some reason the data is not getting stored in Firestore.
- English translation with Yandex: *There is no free tier for individual developers.*
- Tests
- Host the app on Railway or a similar platform

Other:

- Proper error handling and error pages
- There is basic API authentication based on headers, but the api key is passed through the meta tag. Proper api key management is missing.
