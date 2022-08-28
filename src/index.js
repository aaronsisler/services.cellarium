/* eslint-disable no-console */
const { program } = require("commander");
const { submitFilesToCdn } = require("./submit-files-to-cdn");
const {
  getChangedFiles,
  grabDirectoryFiles,
  removeIgnoredFiles,
  validateArgs
} = require("./utils");

const chooseTheType = (method, client, font) => {
  if (client) {
    return method(`assets/clients/${client}/`);
  }

  if (font) {
    return method(`assets/resources/fonts/${font}/`);
  }

  return [];
};

const rootPromise = async () => {
  program
    .option("-p, --processDirectory")
    .option("-c, --client <type>", "Add the specified client")
    .option("-f, --font <type>", "Add to fonts");

  program.parse(process.argv);

  const {
    client,
    font,
    processDirectory: shouldProcessDirectory = false
  } = program.opts();
  validateArgs({ client, font, shouldProcessDirectory });

  let rawFiles;
  if (shouldProcessDirectory) {
    rawFiles = chooseTheType(grabDirectoryFiles, client, font);
  } else {
    rawFiles = chooseTheType(getChangedFiles, client, font);
  }

  const submittedFiles = removeIgnoredFiles(rawFiles);

  console.log(submittedFiles);

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
