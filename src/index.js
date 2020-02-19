/* eslint-disable no-console */
const getChangedFiles = require("./get-changed-files");
// const cdnManager = require("./cdn-manager");

const submitChangedFilesToCDN = async () => {
  const changedFiles = await getChangedFiles("./assets");

  console.log(changedFiles);
  // changedFiles.forEach(async ({ filename, status = "deleted" }) => {
  //   console.log(filename);
  //   console.log(status);
  //   if (["modified", "added"].includes(status.toLowerCase())) {
  //     // await cdnManager.modifyFile(filename);
  //   } else if (status.toLowerCase() === "deleted") {
  //     // await cdnManager.removeFile(filename);
  //   } else {
  //     console.log("File status not found", status, filename);
  //   }
  // });
};

submitChangedFilesToCDN();

// Use below when accidentally committed files already
// Update the committed-files.js file
/*

const committedFiles = require("./committed-files");

const submitCommittedFilesToCDN = async () => {
  committedFiles.forEach(async ({ filename, status }) => {
    if (["modified", "added"].includes(status.toLowerCase())) {
      await cdnManager.modifyFile(filename);
    } else if (status.toLowerCase() === "deleted") {
      await cdnManager.removeFile(filename);
    } else {
      console.log("File status not found", status, filename);
    }
  });
};

// submitCommittedFilesToCDN();
*/
