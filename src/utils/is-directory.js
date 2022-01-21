const fs = require("fs");

const isDirectory = path => {
  try {
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
};

module.exports = { isDirectory };
