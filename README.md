# Cellarium

This service is utilized by all E&B Solutions' deployed applications for CDN artifacts such as images, documents, etc.

## Usage:

1. Update the files in the `assests/clients` that need to be deployed.
1. Run the two AWS Credentials commands in the .env file in the Terminal prompt.
1. Run `npm run publish:dir -- --client=<name-of-client>` where the `client` param is the client name where artifacts where updated.
