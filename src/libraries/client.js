import process from 'process';
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob';
import * as dotenv from 'dotenv';

// load environmental variables from .env file into process.env
dotenv.config();

// get the account name and access key from the environment variables
// and create a shared key credential object to be used to create a pipeline
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

// create a new pipeline with the shared key credential
// and use it to create a new blob service client
const pipeline = newPipeline(sharedKeyCredential);

// create the blog service client with the pipeline
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

// export the blog service client so it can be used in other files
export { blobServiceClient };
