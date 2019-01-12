const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.deleteAllUserData = functions.auth.user().onDelete(user => {
  return new Promise((resolve, reject) => {
    db.collection('links').where('owner', '==', user.uid).get()
    .then(res => {
      const batch = db.batch();
      res.docs.forEach(doc => {
        batch.delete(doc.ref);
      })
      batch.commit();
      db.collection('users').doc(user.uid).delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    })
    .catch(err => {
      console.log(err);
      reject(err);
    })
  })
});
