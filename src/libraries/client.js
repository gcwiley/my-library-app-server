import path from 'node:path';
import process from 'process';
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob';
import * as dotenv from 'dotenv';

// load environmental variables from .env file into process.env
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
  debug: true,
});

// get the account name and access key from the environment variables
// and create a shared key credential object to be used to create a pipeline
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

// Creates a new Pipeline object with Credential provided.
const pipeline = newPipeline(sharedKeyCredential);

// create the blog service client with the pipeline
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

// export the function
export { blobServiceClient };
