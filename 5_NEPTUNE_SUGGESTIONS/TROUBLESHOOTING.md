# Troubleshooting

Following are the steps to resolve some of the common issues you may encounter during the workshop.

## S3 error when loading data to Neptune cluster using CURL command
**Issue**: In module 5, step *1.2 Load the given food dataset into Amazon Neptune*, CURL command takes more than couple of seconds OR returns S3 access deined error.

**Resolution**:
Try the following steps.

Check VPC Endpoint policy
- In module 5, step *1.1 Create Amazon S3 VPC Endpoint*, make sure the VPC endpoint policy you created has the right bucket name.

Update VPC Endpoint route tables
- Modify the route tables you attached to the VPC Endpoints in module 5, step *1.1 Create Amazon S3 VPC Endpoint*. Select all 3 route tables.