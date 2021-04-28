const app = require("express")()

const admin = require("firebase-admin");

const serviceAccount = require("./auth-phantomtec-development-firebase-adminsdk-ltssv-6c3e32079a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/setAdmin', async (req, res) => {
  admin.auth()
    .setCustomUserClaims('NRo7k2yWuKdQplstd0hJpApqXAI2', {
      type:'administrator'
    }).then(() => console.log('done'))
})

app.listen(4000, () => console.log('listening on port 4000'))