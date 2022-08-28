/* eslint-disable no-console */
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const region = "us-east-1";
const bucketName = "cdn-e-and-b-solutions";
aws.config.update({ region });

const upsertFile = async file => {
  const s3 = new aws.S3({ apiVersion: "2006-03-01" });

  const client = path
    .dirname(file)
    .split("/")
    .slice(1)
    .join("/");
  const fileName = path.basename(file);
  const fileKey = `${client}/${fileName}`;

  const fileStream = fs.createReadStream(file);
  fileStream.on("error", err => {
    console.log("File Error", err);
  });

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileStream,
    ACL: "public-read"
  };

  try {
    await s3.upload(uploadParams).send();
  } catch (error) {
    console.log(error.message);
    return;
  }

  console.log("Upload Sucess: ", fileKey);
};

const removeFile = async file => {
  const s3 = new aws.S3({ apiVersion: "2006-03-01" });

  const client = path
    .dirname(file)
    .split("/")
    .slice(2)
    .join("/");
  const fileName = path.basename(file);
  const fileKey = `${client}/${fileName}`;

  const removeParams = { Bucket: bucketName, Key: fileKey };

  try {
    await s3.deleteObject(removeParams).promise();
  } catch (error) {
    console.log(error.message);
    return;
  }

  console.log("Delete Sucess: ", fileKey);
};

module.exports = { removeFile, upsertFile };
