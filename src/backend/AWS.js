const AWS = require('aws-sdk');

const fs = require('fs');
const s3 = new AWS.S3();

module.exports = {
  listBuckets,
  addImage,
  getPicture
};

// Bucket names must be unique across all S3 users

// const myBucket = 'my.unique.bucket.name';

// const myKey = 'myBucketKey';
function listBuckets() {
  s3.listBuckets((err, data) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('Bucket List', data.Buckets);
  }
  });
}

function addImage(userId, imageData, imageKey) {
  //console.log('imageKey', imageKey);
  const buf = new Buffer(imageData, 'base64');
  const uploadParams = { Bucket: 'jad.bucket1', Key: imageKey, ContentEncoding: 'base64', contentType: 'image/jpeg', Body: '' };
  const file = buf;
  // const fileStream = fs.createReadStream(file);
  // fileStream.on('error', (err) => {
  //   console.log('File Error', err);
  // });
  uploadParams.Body = file;
  console.log('filestream', file);
  return s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('error', err);
      return err;
    } if (data) {
      console.log('data', data);
      return data;
    }
  }).promise();
}

function getPicture(params) {
  console.log('params are', params);
  return s3.getObject(params).promise();
}

