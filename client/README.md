# account-lead-lookup - client

## About
This is the client of the Account Lead Lookup that is hosted on the CDT wordpress website at https://cdt.ca.gov/account-lead-lookup/. It is built using javascript, css, and html. The html is stored on a page in the CDT wordpress environment, and the rest is stored in Azure Blob Storage. Images and data are not maintatined by this project, and are just pulled in.

## Dependencies
This project relies on the following external dependencies:
- [jQuery](https://jquery.com/)
- [chosen](https://harvesthq.github.io/chosen/) - jQuery select plugin

## Starting
Use `npm run start` to start the project at http://localhost:3000/. 

## Building
This project uses the [parcel bundler](https://github.com/parcel-bundler/parcel) to bundle to perform several actions such as transpiling, minification, and uglification.

Use `npm run build` to build the project. The output will placed in the `/dist` folder. To deploy, place the contents of this build into the Azure blob storage the CDT site is pointing to.

For running locally, use a file serving system such as [serve](https://github.com/zeit/serve). After building, run `serve -s dist`.

## Deploying
### html
To deploy the html to the wordpress environment, open a ticket to the `OCIO ITSM Services/CDT Website Support` group. The code indicated in index.html surrounded by `INSERT INTO THE HOST SITE` is the code that should be replaced on the CDT site if any changes are needed.

### javascript + css
This project uses the `bpa-azure` package for deploying to Azure Blob Storage, which relies on environment variables being set. 

To setup the environment for deployment copy the `.env.sample` to `.env.dev` and `.env.prod`, then fill out the corresponding variables

To run deployments, use `npm run deploy` for deploying to dev and `npm run deploy:prod` for producation.