const storageConfig = require('../../config/storage');
const fs = require('fs')

const bucketName = storageConfig.name;
const bucket = storageConfig.bucket;

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (file, path) => {
  if (!file) return next();
  return new Promise((resolve, reject) => {
    // add path to the gcsname below by concatenating it before the filename
    const gcsname = path + Date.now() + '_' + file.originalname;
    const uploadFile = bucket.file(gcsname);
    console.log(gcsname);

    const stream = uploadFile.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on('error', (err) => {
      file.cloudStorageError = err;
      reject(err);
    });

    stream.on('finish', () => {
      file.cloudStorageObject = gcsname;
      file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      resolve(file.cloudStoragePublicUrl);
    });

    stream.end(file.buffer);
  });
}

module.exports = ImgUpload;