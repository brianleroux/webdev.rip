# hopedark.com

small experimental indieweb blog

# how i set up

1. setup the code
  - created an Enhance project by running `begin new ./hopedark.com`
  - moved into the project directory `cd hopedark.com` and deployed a staging environment with `begin deploy`
  - created a production env by running `begin create`
  - backed everything up by creating this repo in github/brianleroux/hopedark.com

2. setup the dns
  - registered the domain by running `begin domains add --domain hopedark.com`
  - associated the production env with my new domain by running `begin domains link`

3. setup ci/cd
  - add one smoke test
  - followed these steps for https://begin.com/docs/getting-started/github-actions

