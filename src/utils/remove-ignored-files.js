/* eslint-disable implicit-arrow-linebreak */
const { ignoredFiles } = require("./ignored-files");

const isIgnoredFile = filename =>
  ignoredFiles.find(ignoredFile => filename.includes(ignoredFile));

const removeIgnoredFiles = (files = []) =>
  files.filter(({ filename }) => !isIgnoredFile(filename));

module.exports = { removeIgnoredFiles };
