***THIS PROJECT HAS MOVED TO https://odibpas.visualstudio.com/CDT%20Website%20Integrations/_git/Account%20Lead%20Lookup***

# account-lead-lookup

## About
This is the front end client of the Account Lead Lookup. It is hosted on the CDT wordpress website at https://cdt.ca.gov/account-lead-lookup/. It is built using javascript, css, and html. The html is stored on a page in the CDT wordpress environment, and the rest is stored in Azure Blob Storage. Images and data are pulled in from CPRO and are not maintained by this project.

## Dependencies
This project relies on the following external dependencies:
- [jQuery](https://jquery.com/)
- [chosen](https://harvesthq.github.io/chosen/) - jQuery select plugin

## Starting
Use `npm run start` to start the project at http://localhost:3000/. 

## Building
This project uses the [parcel bundler](https://github.com/parcel-bundler/parcel) to bundle to perform several actions such as transpiling, minification, and uglification.

Use `npm run build` to build the project. The output will placed in the `/dist` folder.

For running locally, this project makes use of [serve](https://github.com/zeit/serve). After building, run `npm run serve`.

## Deploying
### html
To deploy the html to the wordpress environment, open a ticket to the `OCIO ITSM Services/CDT Website Support` group. 

The code indicated in `index.html` surrounded by `INSERT INTO THE HOST SITE` is the code that should be replaced on the CDT site if any changes are needed. Uncomment the dev or prod script and link section that points to the js/css files in Azure Blob Storage. For example, the section under the `UNCOMMENT FOR DEPLOYING IN PROD` comment.

### javascript + css
This project uses the `bpa-azure` package for deploying to Azure Blob Storage, which relies on environment variables being set. 

To setup the environment for deployment copy the `.env.sample` to `.env.dev` and `.env.prod`, then fill out the corresponding variables.

To deploy, use `npm run deploy` for deploying to dev and `npm run deploy:prod` for production.
