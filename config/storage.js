const Promise = require('bluebird');
const GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));

const storage = GoogleCloudStorage({
  projectId: 'edumate-app',
  keyFilename: './config/storage-key.json'
});

const BUCKET_NAME = 'edumate-public-bucket';

module.exports = {
  name: BUCKET_NAME,
  bucket: storage.bucket(BUCKET_NAME)
}