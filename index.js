import restCfWorker from 'cloudflare-worker-rest-api'
const app = new restCfWorker()

app.get("/app/:appId", async (req, res) => {
  console.log("getApp")
  const word = req.params.appId;
  console.log("Param: " + word)
  let data = await EVERGREEN.get(word);
  return res.send(data);
});

app.get("/apps", async (req, res) => {
  console.log("getApps")
  let data = await EVERGREEN.get("_AllApps");
  return res.send(data);
});

addEventListener('fetch', event => {
  event.respondWith(app.handleRequest(event.request))
})
