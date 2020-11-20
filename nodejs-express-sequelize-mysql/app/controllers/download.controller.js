require('dotenv').config();

var AWS = require('aws-sdk');

var accessKey = process.env.ACCESS_KEY
var secretKey = process.env.SECRET_ACCESS_KEY

// Replace these with environment variables once we get fully migrated
AWS.config.update(
  {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  }
);

// Return a presigned URL for the object
exports.getURL = (req, res) => {

  var s3 = new AWS.S3();
  const bucket = req.body.bucket;
  const key = req.body.key;
  try {
    var params = {Bucket: bucket, Key: key};
    s3.getSignedUrl('getObject', params, function (err, url) {
      console.log(url);
      res.send({url: url});
    });
  } catch(err) {
    res.send(err.message);
  }
};

exports.getFile = (req, res) => {
  var s3 = new AWS.S3();
  const bucket = req.body.bucket;
  const key = req.body.key;
  var info = "";
  try {
    var params = {Bucket: bucket, Key: key};
    info = {params: params};
    s3.getObject( params, (err, data) => {
      res.send(data.Body);

    });
  } catch(err) {
    res.send({error: err, data: info});
  }
};