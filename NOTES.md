- We can remove `version` from package.json
- We will mostly use JS scripts for the build steps and the additional required scripts (e.g. versioning)

Requirements:

- `version.cjs` - takes care of bumping the manifest version (by build,patch or minor).
