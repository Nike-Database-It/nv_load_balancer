const id = Math.floor(Math.random()*1000000);

module.exports = {
  settings: {
    concurrency: 1000,  // -c
    max_requests: 2000,  // -n
    output_format: 'text' // -o 'text' or 'json'
  },
  targets: {
    // can have multiple targets here
    // pick one using the --target commandline argument
    local: {
      host: 'localhost',
      port: 3000,
      path: `/:${id}/colors`,
      headers: {
        'X-Optional-Header': "header value"
      }
    }
  }
};