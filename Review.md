# Review Questions

## What is Node.js?

Node.js is a JS environment that allows us to run JS outside of the browser so that passing data from server to client is smoother

## What is Express?

express is a library that you can add to node.js to give it additional functionality. It's a framework

## Mention two parts of Express that you learned about this week.

router and .json

## What is Middleware?

middleware is software that executes between the request and response

## What is a Resource?

resource is what's available in the server for the client to use. They're usually nouns.

## What can the API return to help clients know if a request was successful?

res.status(200)

## How can we partition our application into sub-applications?

using router.
cons router = express.router

server.use('/url', routes)

## What is CORS and why do we need it?

cross origin resource sharing. It allows requests from other domains to access the server
