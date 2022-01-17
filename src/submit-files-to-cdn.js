/* eslint-disable no-console */
const cdnManager = require("./cdn-manager");

const submitFilesToCdn = async (submittedFiles = []) => {
  await submittedFiles.forEach(async ({ filename, status = "deleted" }) => {
    if (["M", "A"].includes(status.toUpperCase())) {
      await cdnManager.upsertFile(filename);
    } else if (status.toUpperCase() === "D") {
      await cdnManager.removeFile(filename);
    } else {
      console.log("File status not found", status, filename);
    }
  });
  console.log("End of submitFilesToCdn");
};

module.exports = { submitFilesToCdn };
