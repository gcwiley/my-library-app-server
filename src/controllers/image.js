
// import intoStream to convert buffer to stream
import intoStream from 'into-stream';

// import multer to handle file uploads
import multer from 'multer';

// import blob service client
import { blobServiceClient } from '../libraries/client.js';

// define the storage strategy
const inMemoryStorage = multer.memoryStorage();

// define the upload strategy
export const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

// upload options
// bufferSize: number of bytes to buffer before sending to Azure Storage
// maxBuffers: maximum number of buffers to allow before sending to Azure Storage
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

// function to convert buffer to stream 
const getStream = intoStream();

// name of the container in blob storage to store images
const containerName2 = 'images';

// Size of one megabyte in bytes - used to calculate the buffer size
const ONE_MEGABYTE = 1024 * 1024;

// function to generate a unique file name
const getBlobName = (originalName) => {
  // use a ramdom number to generate a unique file name
  // removing "0" from the start of the string
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}=${originalName}`;
};

// function to upload image to blob storage - UPLOAD IMAGE
// POST /api/upload
export const uploadImage = async (req, res) => {
  const blobName = getBlobName(req.file.originalName);
  const stream = getStream(req.file.buffer);
  const containerClient = blobServiceClient.getContainerClient(containerName2);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
      blobHTTPHeaders: { blobContentType: 'image/jpeg' },
    });
    res.send({ message: 'File uploaded to Azure Blob storage.' });
  } catch (error) {
    res.status(500).send();
  }
};
