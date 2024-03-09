const fs = require('node:fs');
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../sentences-tb-firebase-adminsdk.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const sentencesRef = db.collection("sentences");

fs.readFile('sentences.jsonl.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data.split('\n').forEach((sentence) => {
    const sentenceJson = JSON.parse(sentence);
    const catsArray = Object.entries(sentenceJson.cats);
    const sentenceObject = {};

    // Transform to array of category strings
    sentenceObject.cats = catsArray.filter(([_key, value]) => value === 1).map(([key, _value]) => key);
    sentenceObject.content = sentenceJson.text;

    sentencesRef.add(sentenceObject);
  });
});
