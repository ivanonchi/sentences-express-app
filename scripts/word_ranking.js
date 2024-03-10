require('dotenv').config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

const sentencesRef = db.collection("sentences");

const wordHistogram = {};

sentencesRef.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const sentence = doc.data();
    const words = sentence.content.split(' ');
    words.forEach((word) => {
      if (word in wordHistogram) {
        wordHistogram[word] += 1;
      } else {
        wordHistogram[word] = 1;
      }
    });
  });
  const wordRanking = Object.entries(wordHistogram).sort((a, b) => b[1] - a[1]);
  for (let index = 0; index < 100; index++) {
    console.log(wordRanking[index]);
  }
});
