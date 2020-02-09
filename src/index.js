/*
1. Check to see if uploading an edited file causes a git diff
Check a list of all changed files
    * Added
    * Modified
    * Deleted
    * Moved
        * Is this two calls to S3?
        * One to delete, one to add
Loop over list and do correct action to load to S3
    * All files should be public
*/
const gitChangedFiles = require("git-changed-files");

const getFiles = async () => {
  const { unCommittedFiles } = await gitChangedFiles();

  console.log(unCommittedFiles);
};

getFiles();
