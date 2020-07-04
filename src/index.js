/* eslint-disable no-console */
const getChangedFiles = require("./get-changed-files");
const cdnManager = require("./cdn-manager");
const ignoredFiles = require("./ignored-files");

const submitChangedFilesToCDN = async () => {
  const changedFiles = getChangedFiles("./assets/clients/waterbrooke");

  changedFiles.forEach(async ({ filename, status = "deleted" }) => {
    if (ignoredFiles.find(ignoredFile => filename.includes(ignoredFile))) {
      return;
    }

    if (["modified", "A"].includes(status.toUpperCase())) {
      await cdnManager.modifyFile(filename);
    } else if (status.toUpperCase() === "D") {
      await cdnManager.removeFile(filename);
    } else {
      console.log("File status not found", status, filename);
    }
  });
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
