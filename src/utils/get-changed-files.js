const gitChangedFiles = require("@ebsolutions/git-my-files");

const getChangedFiles = folderPath => gitChangedFiles(folderPath);

module.exports = { getChangedFiles };
