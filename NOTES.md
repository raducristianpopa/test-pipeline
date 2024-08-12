- We can remove `version` from package.json
- We will mostly use JS scripts for the build steps and the additional required scripts (e.g. versioning)

Requirements:

- `version.cjs` - takes care of bumping the manifest version (by build, patch or minor).

!!! IMPORTANT !!!

Make sure to have the extension version as `major.minor.patch.build`
Add environments when pushing to preview channel and for the promotion of a preview release
(someone has to approve them)
