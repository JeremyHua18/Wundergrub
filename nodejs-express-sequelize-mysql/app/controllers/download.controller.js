var AWS = require('aws-sdk');

// Replace these with environment variables once we get fully migrated
AWS.config.update(
  {
    accessKeyId: "AKIAI3JIGBTRQL22EWEQ",
    secretAccessKey: "6soMeGorof5N0OD/A/sFynUu/SKsPoy24nu/AL7E",
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
  ar s3 = new AWS.S3();
  const bucket = req.body.bucket;
  const key = req.body.key;
  try {
    var params = {Bucket: bucket, Key: key};
    s3.getObject(params, (err, data) => {
      if (err) console.error(err);
      res.send({fileContent: data});
    });
  } catch(err) {
    res.send(err.message);
  }
};