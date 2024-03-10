require('dotenv').config();
const fs = require('node:fs');
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

const sentencesRef = db.collection("sentences");

fs.readFile(process.argv[2], 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  data.split('\n').forEach(async (sentence) => {
    if (!sentence) {
      console.log('Empty sentence');
      process.exit();
    }
    const sentenceJson = JSON.parse(sentence);
    const catsArray = Object.entries(sentenceJson.cats);
    const sentenceObject = {};

    // Transform to array of category strings
    sentenceObject.cats = catsArray.filter(([_key, value]) => value === 1).map(([key, _value]) => key);
    sentenceObject.content = sentenceJson.text;

    await sentencesRef.add(sentenceObject);
  });
});
