// Create web server
const http = require('http');
// Create web server
const server = http.createServer((req, res) => {
  // Get the path
  const path = req.url;
  // Get the method
  const method = req.method;
  // If the path is /, send a form
  if (path === '/') {
    res.write('<html>');
    res.write('<head><title>Enter a comment</title></head>');
    res.write('<body><form action="/create-comment" method="POST"><input type="text" name="comment"><button type="submit">Submit comment</button></form></body>');
    res.write('</html>');
    // Return a response
    return res.end();
  }
  // If the path is /create-comment, create a comment
  if (path === '/create-comment' && method === 'POST') {
    // Create an array to store the comment
    const body = [];
    // Add a listener to the request object for data
    req.on('data', (chunk) => {
      // Push the data into the array
      body.push(chunk);
    });
    // Add a listener to the request object for end
    req.on('end', () => {
      // Create a variable to store the parsed body
      const parsedBody = Buffer.concat(body).toString();
      // Get the comment from the parsed body
      const comment = parsedBody.split('=')[1];
      // Log the comment
      console.log(comment);
    });
    // Redirect to /
    res.statusCode = 302;
    res.setHeader('Location', '/');
    // Return a response
    return res.end();
  }
  // Return a 404 response
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>404</title></head>');
  res.write('<body><h1>404: Page not found</h1></body>');
  res.write('</html>');
  res.end();
});

// Listen on port 3000
server.listen(3000);