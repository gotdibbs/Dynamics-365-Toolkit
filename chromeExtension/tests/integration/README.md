## Prerequisites

* Node
* Yarn
* Browserstack Credentials (or switch runner to local)
* Publicly addressable Dynamics environment to test against

## Getting setup

1. Copy `.env.example` to `.env`
2. Fill in the required values, noting that the browserstack keys are only used for testing against browserstack as noted below.

## Running the test suite locally

You may find that running the full test suite for Chrome and Edge, against both Windows and Mac, to be very time consuming. To more quickly test your changes:

1. Install dependencies using `yarn install` from a command prompt in this folder
2. Run `yarn test:local` to run the full suite of tests against a local installation of Chrome only

**Note:** Please run the full suite, described below, before pushing your changes up.

## Running the test suite against browserstack

**Note:** These tests run against browserstack and use its API to retrieve the most recent versions of Chrome and Edge. Accordingly, a username and access key are required. These values need to be set in the `.env` file.

1. Install dependencies using `yarn install` from a command prompt in this folder
2. Run `yarn test` to run the full suite of tests against multiple browsers and versions in Browserstack