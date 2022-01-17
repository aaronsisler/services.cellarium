/* eslint-disable no-console */
const { program } = require("commander");
const { submitFilesToCdn } = require("./submit-files-to-cdn");
const {
  getChangedFiles,
  grabDirectoryFiles,
  removeIgnoredFiles,
  validateArgs
} = require("./utils");

const rootPromise = async () => {
  program
    .option("-p, --processDirectory")
    .option("-c, --client <type>", "Add the specified client");

  program.parse(process.argv);

  const {
    client,
    processDirectory: shouldProcessDirectory = false
  } = program.opts();
  validateArgs({ client, shouldProcessDirectory });

  let rawFiles;
  if (shouldProcessDirectory) {
    rawFiles = grabDirectoryFiles(`./assets/clients/${client}/`);
  } else {
    rawFiles = getChangedFiles(`./assets/clients/${client}/`);
  }
  const submittedFiles = removeIgnoredFiles(rawFiles);

  await submitFilesToCdn(submittedFiles);
};

const rootMethod = async () => {
  try {
    await rootPromise();
  } catch (e) {
    // Deal with the fact the chain failed
  }
};

module.exports = rootMethod();
