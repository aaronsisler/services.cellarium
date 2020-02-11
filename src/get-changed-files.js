const gitChangedFiles = require("git-changed-files");

module.exports = async () => {
  const { unCommittedFiles } = await gitChangedFiles({
    formats: ["*.jpg"],
    showStatus: true
  });

  return unCommittedFiles;
};
