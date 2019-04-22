module.exports = async (context, myTimer) => {
  const SFURL = process.env.SF_URL;
  const SFClientId = process.env.SF_CLIENTID
  const SFClientSecret = process.env.SF_CLIENTSECRET
  const SFusername = process.env.SF_USERNAME;
  const SFpassword = process.env.SF_PASSWORD;
  const SFQuery = process.env.SF_QUERY;
  const account = process.env.ACCOUNT;
  const accountKey = process.env.ACCOUNT_KEY;
  const containerName = process.env.CONTAINER_NAME;

  const jsforce = require('jsforce');
  const zlib = require('zlib');
  const fetch = require('node-fetch');
  const {
    Aborter,
    BlockBlobURL,
    ContainerURL,
    ServiceURL,
    StorageURL,
    SharedKeyCredential
  } = require('@azure/storage-blob');
  const { promisify } = require('util');
  const gzipAsync = promisify(zlib.gzip);

  // Check if all.json exists in blob storage. If not, create it and set HTTP headers.
  const response = await fetch('https://prododisharedstore01.blob.core.windows.net/account-lead-lookup/all.json', { method: 'HEAD' });
  if (response.headers.get('content-length') === null) {
    // Connect to Azure Blob Storage.
    const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
    const pipeline = StorageURL.newPipeline(sharedKeyCredential);
    const serviceURL = new ServiceURL(
      `https://${account}.blob.core.windows.net`,
      pipeline
    );
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, "all.json");
    await blockBlobURL.upload(Aborter.none, "", 0);
    await blockBlobURL.setHTTPHeaders(Aborter.none, { blobContentEncoding: "gzip", blobCacheControl: "public max-age=14400" });
  }
  // Connect to the Salesforce connected app.
  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: SFURL,
      clientId: SFClientId,
      clientSecret: SFClientSecret,
      redirectUri: SFURL
    }
  });
  await conn.login(SFusername, SFpassword);
  // Query the Salesforce connected app for account lead data.
  const results = await conn.query(SFQuery);
  context.log("Results : " + results.records.length);
  // Compress account lead data with gzip.
  const data = JSON.stringify(results);
  const options = { level: zlib.constants.Z_BEST_COMPRESSION }
  const compress = await gzipAsync(data, options);
  // Replace all.json file in Azure Blob Storage.
  context.bindings.outputBlob = compress
};
