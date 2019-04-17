# account-lead-lookup

## About
This project is for the Account Lead Lookup, located on the CDT website at https://cdt.ca.gov/account-lead-lookup/.

## Dependencies
This project relies on the following external dependencies:
- (jQuery)[https://jquery.com/]
- (chosen)[https://harvesthq.github.io/chosen/] - jQuery select plugin

## Starting
Use `npm run start` to start the project at http://localhost:3000/. 

## Building
This project uses the (parcel bundler)[https://github.com/parcel-bundler/parcel] to bundle to perform several actions such as transpiling, minification, and uglification.

Use `npm run build` to build the project. The output will placed in the `/dist` folder. To deploy, place the contents of this build into the Azure blob storage the CDT site is pointing to.

For running locally, use a file serving system such as (serve)[https://github.com/zeit/serve]. After building, run `serve -s dist`.

## Deploying
This project uses the `bpa-azure` package for deploying to Azure Blob Storage, which relies on environment variables being set. 

To setup the environment for deployment copy the `.env.sample` to `.env.dev` and `.env.prod`, then fill out the corresponding variables

To run deployments, use `npm run deploy` for deploying to dev and `npm run deploy:prod` for producation.