const gitChangedFiles = require("@ebsolutions/git-my-files");

module.exports = folderPath => gitChangedFiles(folderPath);
