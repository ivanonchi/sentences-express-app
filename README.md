## Sample express.js app

### Getting started

1. This app uses Firestore as backend with the firebase-admin npm, so it requires the google serviceAccountKey.json file to be downloaded from the Firebase console. Please place in a safe location and set the GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to its location. See instructions to generate the file and set the environment variable [here](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments)
2. Run locally as: `npm start` or in debug mode: `DEBUG=app:* npm start`


### TODO

- English translation with Yandex
- Count the top 100 words across all sentences
- Bonus: API authentication
- Bonus: Tests
- Bonus: Host the app on Railway or a similar platform
