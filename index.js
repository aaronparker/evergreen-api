// Uses the cloudflare-worker-rest-api package
import restCfWorker from 'cloudflare-worker-rest-api'
const app = new restCfWorker()

// Returns data for a specific app
app.get("/app/:appId", async (req, res) => {
  console.log("getApp")
  const word = req.params.appId;
  console.log("Param: " + word)
  let data = await EVERGREEN.get(word);
  return res.send(JSON.parse(data));
});

// Returns data for all supported apps
app.get("/apps", async (req, res) => {
  console.log("getApps")
  let data = await EVERGREEN.get("_AllApps");
  return res.send(JSON.parse(data));
});

// Responder
addEventListener('fetch', event => {
  event.respondWith(app.handleRequest(event.request))
})
