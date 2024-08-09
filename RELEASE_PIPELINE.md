# Web Monetization Extension Release Pipeline

3 versions of the extensions will be maintained:

- Nightly
- Preview
- Release

## Extension versioning

Web extensions do not follow SEMVER. The version string consists of 1 to 4 numbers separated by dots, for example, `1.2.3.4` (`major.minor.patch.build`). This is essentially SEMVER but with an additional build number, but does not support the alpha, beta or other suffixes.

### Major version bump

A `major` version bump (`2.0.0.0`) signifies the start of a block of product features.

Before the extension is available first on the release channel, we only increase the build number (`2.0.0.x`). After that, we follow SEMVER (`2.x.y`).

### Minor version bump

New features and enhancements will be released under a minor version bump.

### Patch version bump

Bug fixes, performance and small updates will be released under a patch version bump.

### Build version bump

The build version bump should only happen when starting the work on a new major version. Once `v1` goes into maintenance mode, the extension major version is bumped to `2.0.0.0`. Until the new major version is made available on the release channel, only build number should be incremented.

Multiple "build" version bumps can be made available in the preview channel. e.g. We can have `2.0.0.1, 2.0.0.2, ..., 2.0.0.90` in the preview channel before we make it available in the release channel.

Note: When the new major version is going to be available in the release channel, it will have the last published version as in the Preview channel (i.e. the first release channel build could be `2.0.0.90`, not necessarily `2.0.0` or `2.0.1`).

## Nightly

The nightly version will be built every day at 12AM UTC and it will be added to GitHub releases with the tag `nightly`.

Nightly releases will correspond to the latest commit in the `main` branch of the repository at the time of the build. The tag reference will get updated on every release. Whenever a new releases is happening, the previous one gets deleted first.

- TODO: link/list workflow file

### Versioning for the Nightly build

On every action run, the workflow will update the following properties in the
manifest:

- `version`: will be set to the current date in `YYYY.mm.dd` format
- `version_name`: will be set to `YYYY.mm.dd Nightly ({short_commit_hash})`

### Release Artifacts:

Artifacts follow the name: `nightly-{browser}-{version}.zip`, e.g. `nightly-chrome-2024.7.13.zip`, `nightly-edge-2024.7.13.zip`, `nightly-firefox-2024.7.13.zip`

## Preview

The preview version represents a release candidate on the `main` branch. They are less stable than the Release version.

Releases are triggered manually (via GitHub Actions), and can have a minor/patch/build version bump.

### Release Artifacts:

Artifacts follow the name `preview-{browser}-{version}.zip`, e.g. `preview-chrome-1.0.4.zip`, `preview-edge-2.0.0.12.zip`, `preview-firefox-2.1.1.zip`

## Release

Some of the releases from the Preview channel (that are considered stable enough) are promoted to the Release channel.

Release promotions are triggered manually (via GitHub Actions).

### Release artifacts:

Artifacts follow the name `{browser}-{version}.zip`, e.g. `chrome-1.0.4.zip`, `edge-2.0.0.12.zip`, `firefox-2.1.1.zip`

---

## Branching strategy

Whenever a major version goes into maintenance mode, `v{major}.x` is branched-off main (e.g. when we work work v2, we split a `v1.x` branch from `main`, and then `main` will correspond to `v2.x`). The maintanence branch will mostly receive bug fixes and security updates (TODO: ask team what else we want in maintenance).

We primarily work over the `main` branch. For the maintenance of previous major versions, PRs can be sent to the `v{major}.x` branch. If some commits in `main` need to available on earlier major versions as well, they can be backported (after being merged into `main`) by sending a PR with the other major branch (e.g. `v1.x`) as base.

### Pull requests

When there's a commit that needs to be backported, the PR corresponding to that commit should have a `needs backport` label. Once backported, the label should be removed (or replaced with `backported`).

---

## Code updates

- In the build we should have a `CHANNEL` flag (with values: nightly, preview and release).
  - Absence of flag (as in dev environment) corresponds to Nightly builds.
  - We can update the name, description, version name and other metadata in manifest.json based on this flag.
- Update browser listings (currenty only Chrome and Firefox) - add Opera, Edge
- A Safari can be added later on since it requires a special build.
- For manualy workflow, the commits/PRs are to be authored as the person who triggered the workflow (GitHub Actions bot can be co-author).
