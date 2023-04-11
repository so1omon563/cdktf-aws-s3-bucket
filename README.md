# Generic S3 bucket creation using CDKTF

Welcome to my CDKTF learning process. This repository is an EXTREME work in progress, and is intended to be a learning tool for myself and others.

I am not a developer, so there are probably(certainly) a lot of things that could be done better.

This code can be used to create a single S3 bucket with a few default tags. It uses [this](https://registry.terraform.io/modules/so1omon563/s3/aws/latest) Terraform module to handle the creation, which enforces some best practices by default.

## Current limitations

- Currently applies few default tags that are hardcoded in the `main.ts`.

- Currently requires that you have a `variables.json` file in the root of the project that contains the required variables.

- Currently can only use the local backend. Note that the local state files are specifically ignored in the `.gitignore` file. So you will need to ensure that you have a backup of your state files.

## Usage

Prior to working with this code, you will need to initialize your environment. This will install the required dependencies

```shell
npm run upgrade
npm run get
```

You will then be able to use the `cdktf` commands to deploy, destroy, or diff your code.

At the moment, this is a very simple example of creating an S3 bucket using CDKTF. It currently requires that 2 variables be passed in using the `variables.json` file. Making this more elegant is the first thing on my list of TODOs.

The 2 values are `region` and `bucketName`.

- `region` is the AWS region that you wish to create the bucket in.

- `bucketName` is the naming prefix of the bucket name that you wish to create. All buckets created by this module will have the `region` and `Account ID` appended to the end of the `bucketName` to help ensure uniqueness.

An example of the `variables.json` file is below:

```json
{
    "bucketName": "cdk-json",
    "region": "us-east-1"
}
```

## Technical Requirements

This assumes you have appropriate versions of Terraform and CDKTF installed.

It is suggested that you ensure that you have your `awscli` environment set up, and that you use `aws-runas` to assist with AWS permissions.:

- [awscli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [aws-runas](https://mmmorris1975.github.io/aws-runas/)

### AWS authentication

It is HIGHLY suggested that you use the `aws-runas` utility to facilitate handling your AWS credentials.

If you wish to pass in your credentials to your CDKTF commands (without having to manually export them), you can do so by running the following command (assuming you have `aws-runas` installed locally):

```shell
    aws-runas -E <profile_name> cdktf deploy|destroy|diff|synth|plan
```

Another useful option is to use the [EC2 metatdata server](https://mmmorris1975.github.io/aws-runas/metadata_credentials.html) built in to `aws-runas`.

An example of using the metadata server using .zshrc aliases can be found [here](https://gist.github.com/so1omon563/4318631a1a903b3839f353df776f7d13).
