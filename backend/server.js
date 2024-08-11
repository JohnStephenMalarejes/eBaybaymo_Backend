const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors());

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to handle image upload and forwarding
app.post('/check_image', upload.single('baybayin_photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const formData = new FormData();
    formData.append('baybayin_photo', req.file.buffer, req.file.originalname);

    const response = await axios.post('https://ebaybaymo-api.herokuapp.com/check_image/', formData, {
      headers: formData.getHeaders(),
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error forwarding the image:', error.message || error);
    res.status(500).send({ error: 'Failed to upload image' });
  }
});

app.get('/getData', function(req,res){
  res.status(200).send({
    success: "true",
    name: "Education",
    response: "Working"
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
