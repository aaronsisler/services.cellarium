/* eslint-disable no-console */
/*
DONE Check to see if uploading an edited file causes a git diff
DONE Check a list of all changed files
    * Added
    * Modified
    * Deleted
    * Moved
        * Is this two calls to S3?
        * One to delete, one to add
Loop over list and do correct action to load to S3
    * All files should be public
*/
const getChangedFiles = require("./get-changed-files");
const cdnManager = require("./cdn-manager");

const submitChangedFilesToCDN = async () => {
  const changedFiles = await getChangedFiles();
  // console.log(changedFiles);
  // const [firstFile] = changedFiles;
  // console.log(firstFile);
  // await cdnManager.addFile(firstFile.filename);
  // await cdnManager.removeFile(firstFile.filename);
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
