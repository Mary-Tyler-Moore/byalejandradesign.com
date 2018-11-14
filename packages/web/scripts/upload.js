#!/usr/bin/env node
const uploadToS3 = require('./upload-to-s3');

const upload = async () => {
  try {
    await uploadToS3();
    console.log('upload successful');
  } catch (e) {
    console.log(e);
  }
};

upload();
