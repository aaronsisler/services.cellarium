const { getChangedFiles } = require("./get-changed-files");
const { grabDirectoryFiles } = require("./get-directory-files");
const { isDirectory } = require("./is-directory");
const { removeIgnoredFiles } = require("./remove-ignored-files");
const { validateArgs } = require("./validate-args");

module.exports = {
  getChangedFiles,
  grabDirectoryFiles,
  isDirectory,
  removeIgnoredFiles,
  validateArgs
};
