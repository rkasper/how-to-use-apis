# How-to-use-apis

The purpose of this project is to demonstrate how to invoke external APIs from TypeScript using various authentication methods.

## Installation

This project uses Deno as its runtime. I install Deno for Mac using Homebrew. Either use `brew` (recommended) or install Deno by referring to its [official guide](https://deno.land).

## Usage

There are three examples provided in this project:

* `a-simple-api.ts`: A simple example demonstrating how to call an API that does not require authentication.
* `b-api-with-shared-secret.ts`: This example shows how to call an API that requires a shared secret for authentication.
* `c-api-with-oauth2.ts`: An example demonstrating how to call an API that requires user login through OAuth2.

## Note

The code is designed and tested to run on Deno. For other TypeScript runtimes, you may need to adjust the code.
