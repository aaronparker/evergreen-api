// Uses the cloudflare-worker-rest-api package
import restCfWorker from 'cloudflare-worker-rest-api'
const app = new restCfWorker()

// Returns data for a specific app
app.get("/app/:appId", async (req, res) => {
  const word = req.params.appId;
  console.log("get app: " + word + ".");

  let data = await EVERGREEN.get(word.toLowerCase());

  if (data === null) {
    console.log("No data found.");
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return new Response('{message: "Application not found. List all apps for valid application names. Application names are case sensitive.}', {
      status: 404,
      headers: headers
    });
  } else {
    console.log("Return data for: " + word);
    return res.send(JSON.parse(data));
  }
});

// Returns data for all supported apps
app.get("/apps", async (req, res) => {
  console.log("get all apps.")
  console.log(req.params)

  let data = await EVERGREEN.get("_allapps");

  if (data === null) {
    console.log("No data found.");
  } else {
    return res.send(JSON.parse(data));
  }
});

// Return data for /*
app.get('/', async (req, res) => {
  console.log(req);
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  
  return new Response('{message: "Method not found. Call /apps for available applications.}', {
    status: 404,
    headers: headers
  });
});

// Responder
addEventListener('fetch', event => {
  event.respondWith(app.handleRequest(event.request))
})
