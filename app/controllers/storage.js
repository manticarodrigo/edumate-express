var storageConfig = require('../../config/storage');
const fs = require('fs')

const bucketName = storageConfig.name;
const bucket = storageConfig.bucket;

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req) => {
  if(!req.file) return next();
  return new Promise((resolve, reject) => {
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      reject(err);
    });

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      resolve(req.file.cloudStoragePublicUrl);
    });

    stream.end(req.file.buffer);
  });
}

module.exports = ImgUpload;