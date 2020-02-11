/* eslint-disable no-console */
const getChangedFiles = require("./get-changed-files");
const cdnManager = require("./cdn-manager");

const submitChangedFilesToCDN = async () => {
  const changedFiles = await getChangedFiles();

  changedFiles.forEach(async ({ filename, status }) => {
    if (["modified", "added"].includes(status.toLowerCase())) {
      await cdnManager.modifyFile(filename);
    } else if (status.toLowerCase() === "deleted") {
      await cdnManager.removeFile(filename);
    } else {
      console.log("File status not found", status, filename);
    }
  });
};

submitChangedFilesToCDN();
