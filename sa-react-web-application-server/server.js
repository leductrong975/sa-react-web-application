const app = require("express")()

const admin = require("firebase-admin");

const serviceAccount = require("./auth-phantomtec-development-firebase-adminsdk-ltssv-6c3e32079a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});