/* eslint-disable no-console */

const validateArgs = ({ client, font, processDirectory }) => {
  const validTypes = [true, false];

  if (processDirectory === undefined) {
    console.log("'processDirectory' is required\nShould be true or false");
    process.exit(1);
  }

  if (!validTypes.includes(processDirectory)) {
    console.log("'processDirectory' is required\nShould be true or false");
    process.exit(1);
  }

  if (client === undefined && font === undefined) {
    console.log(
      "'client' or 'font' is required\ni.e. --client=e-and-b-solutions (2 dashes)"
    );
    process.exit(1);
  }

  if (client !== undefined && font !== undefined) {
    console.log("Only 'client' and 'font' may be provided, not both");
    process.exit(1);
  }

  if (client) {
    if (client.length === 0) {
      console.log("'client' must be populated");
      console.log("client: ", client);
      process.exit(1);
    }

    if (client.includes("clients")) {
      console.log("'clients' is not needed in base path");
      console.log("client: ", client);
      process.exit(1);
    }

    if (client.includes("/")) {
      console.log("Slashes should not be in 'client'");
      console.log("client: ", client);
      process.exit(1);
    }
  }

  if (font) {
    if (font.length === 0) {
      console.log("'font' must be populated");
      console.log("font: ", font);
      process.exit(1);
    }

    if (font.includes("fonts")) {
      console.log("'fonts' is not needed in base path");
      console.log("font: ", font);
      process.exit(1);
    }

    if (font.includes("/")) {
      console.log("Slashes should not be in 'font'");
      console.log("font: ", font);
      process.exit(1);
    }
  }
};

module.exports = { validateArgs };
