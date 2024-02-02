// index.tsx
var server = Bun.serve({
  port: 3005,
  fetch(request) {
    return new Response("Welcome to Bun!");
  }
});
console.log(`Listening on localhost:${server.port}`);
