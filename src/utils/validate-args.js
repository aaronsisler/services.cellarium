/* eslint-disable no-console */

const validateArgs = ({ client, shouldProcessDirectory }) => {
  const validTypes = [true, false];

  if (shouldProcessDirectory === undefined) {
    console.log(
      "'shouldProcessDirectory' is required\nShould be true or false"
    );
    process.exit(1);
  }

  if (!validTypes.includes(shouldProcessDirectory)) {
    console.log(
      "'shouldProcessDirectory' is required\nShould be true or false"
    );
    process.exit(1);
  }

  if (client === undefined) {
    console.log(
      "'client' is required\ni.e. --client=e-and-b-solutions (2 dashes)"
    );
    process.exit(1);
  }

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
};

module.exports = { validateArgs };
