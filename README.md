# account-lead-lookup
This project is for the Account Lead Lookup, located on the CDT website at https://cdt.ca.gov/account-lead-lookup/.

The [front end client](./client/) is built using js/css/html and is statically hosted on the Azure Blob Storage. The [function app](./function-app/) is a Azure Function App, that is ran on a timer, and is responsible for updating the data retrieved by the front end.
