// Uses the cloudflare-worker-rest-api package
import restCfWorker from 'cloudflare-worker-rest-api'
const app = new restCfWorker()

// Returns data for a specific app
app.get("/app/:appId", async (req, res) => {
  const word = req.params.appId;
  console.log("get app: " + word + ".");
  let data = await EVERGREEN.get(word);
  return res.send(
    JSON.parse(data),
    { "content-type": "application/json" },
    200
  );
});

// Returns data for all supported apps
const noApp = {
  "Status": 1,
  "Message": "Application not found. List all apps for valid application requests. Application names are case sensitive."
}

app.get("/apps", async (req, res) => {
  console.log("get all apps.")
  let data = await EVERGREEN.get("_AllApps");
  if (data === null) {
    return res.send(
      noApp,
      { "content-type": "application/json" },
      404
    );
  }
  else {
    return res.send(
      JSON.parse(data),
      { "content-type": "application/json" },
      200
    );
  }
});

// Return data for /*
const noData = {
  "Status": 1,
  "Message": "Method not found. Call /apps for available applications."
}

app.get('/*', async (req, res) => {
  console.log(req.body);
  return res.send(
    noData,
    { "content-type": "text/html" },
    404
  );
});


// Responder
addEventListener('fetch', event => {
  event.respondWith(app.handleRequest(event.request))
})
