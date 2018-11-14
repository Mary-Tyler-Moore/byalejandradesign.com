// require env if needed
const getEnv = require('./get-env');
const s3 = require('s3');

const uploadToS3 = () =>
  new Promise((res, rej) => {
    getEnv();

    const client = s3.createClient({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      localDir: 'public',
      deleteRemoved: true,

      s3Params: {
        Bucket: `${process.env.STAGE}--byalejandradesign.com`,
      },
    };

    const uploader = client.uploadDir(params);

    console.log('uploading...');

    uploader.on('error', (err) => {
      rej(err);
    });

    uploader.on('progress', () => {});

    uploader.on('end', () => {
      res();
    });
  });

module.exports = uploadToS3;
