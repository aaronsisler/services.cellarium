const committedFiles = [];
const addFile = filename => committedFiles.push({ filename, status: "added" });

addFile(
  "assets/clients/waterbrooke/activities/activities-container__disco.jpg"
);

module.exports = committedFiles;
