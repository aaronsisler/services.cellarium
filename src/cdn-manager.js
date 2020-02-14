/* eslint-disable no-console */
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const region = "us-east-1";
const bucketName = "cdn-e-and-b-solutions";
aws.config.update({ region });

const modifyFile = async file => {
  const s3 = new aws.S3({ apiVersion: "2006-03-01" });

  const client = path
    .dirname(file)
    .split("/")
    .slice(2)
    .join("/");
  // console.log(client);
  const fileName = path.basename(file);
  const fileKey = `${client}/${fileName}`;

  const fileStream = fs.createReadStream(file);
  fileStream.on("error", err => {
    console.log("File Error", err);
  });

  const uploadParams = { Bucket: bucketName, Key: fileKey, Body: fileStream };

  // console.log(uploadParams);
  try {
    await s3.upload(uploadParams).send();
    console.log("Upload Sucess: ", fileKey);
  } catch (error) {
    console.log(error.message);
  }
};

const removeFile = async file => {
  const s3 = new aws.S3({ apiVersion: "2006-03-01" });

  const client = path.dirname(file).split("/")[2];
  const fileName = path.basename(file);
  const fileKey = `${client}/${fileName}`;

  const removeParams = { Bucket: bucketName, Key: fileKey };

  try {
    await s3.deleteObject(removeParams).promise();
    console.log("Delete Sucess: ", fileKey);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { modifyFile, removeFile };
