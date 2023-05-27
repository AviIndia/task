const jsonServer = require('json-server');
const server = jsonServer.create();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for file uploads

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(upload.single('file')); // Use multer middleware for file upload

// Handle file upload route
server.post('/upload', (req, res) => {
  const file = req.file; // Access the uploaded file

  // Perform additional logic to move the file to a specific folder
  // For example, you can use fs.rename to move the file to a different directory

  res.json({ message: 'File uploaded successfully!' });
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
