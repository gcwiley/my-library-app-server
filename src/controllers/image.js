import intoStream from 'into-stream';

// import blob service client
import { blobServiceClient } from '../libraries/client.js';

// upload options
// bufferSize: number of bytes to buffer before sending to Azure Storage
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const getStream = intoStream();

// name of the container in blob storage
const containerName2 = 'images';

// Size of one megabyte in bytes
const ONE_MEGABYTE = 1024 * 1024;

// function to generate a unique file name
const getBlobName = (originalName) => {
  // use a ramdom number to generate a unique file name
  // removing "0" from the start of the string
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}=${originalName}`;
};

// function to upload image to blob storage - UPLOAD IMAGE
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
