const { initializeApp, cert, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../sentences-tb-firebase-adminsdk.json");

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

const sentencesRef = db.collection("sentences");

module.exports = {
  getSentences: async function (orderBy = null, direction = "asc", cursor = null, page = null, limit = 10) {
    let sentences = sentencesRef.orderBy(orderBy, direction).limit(limit);
    if (cursor) {
      const doc = await sentencesRef.doc(cursor).get();
      if (page === "previous") {
        sentences = sentences.endBefore(doc);
      } else if (page === "next") {
        sentences = sentences.startAfter(doc);
      }
    }
    const snapshot = await sentences.get();
    const results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  },
  getSentence: async function (sentence_id) {
    const doc = await sentencesRef.doc(sentence_id).get();
    return { id: doc.id, ...doc.data() };
  },
  createSentence: async function (sentence) {
    await sentencesRef.add(sentence);
  },
  updateSentence: async function (id, sentence) {
    await sentencesRef.doc(id).set(sentence);
  },
  deleteSentence: async function (sentence_id) {
    await sentencesRef.doc(sentence_id).delete();
  },
};
