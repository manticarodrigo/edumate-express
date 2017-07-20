var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));

var storage = GoogleCloudStorage({
  projectId: 'edumate-app',
  keyFilename: './config/storage-key.json'
});

var BUCKET_NAME = 'edumate-public-bucket';

module.exports = {
  name: BUCKET_NAME,
  bucket: storage.bucket(BUCKET_NAME)
}