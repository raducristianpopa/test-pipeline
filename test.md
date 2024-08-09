# 8th of August

1.0.0

[P]review

[R]elease

P: 1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.0.5 (dev process)
R: 1.0.3, 1.0.5

P: 1.1.0

Release v1
P: 1.0.0
R: 1.0.0

Work on v1
P: 1.0.1, 1.0.2
R: -----, 1.0.2

Work on v1
P: 1.0.0.1, 1.0.0.2, 1.0.1
R: ----------------- 1.0.1

Start v2 (main branch; split v1 as branch)
P: 2.0.0.123 (equivalent to 2.0.1-beta.123) -> 2.0.1

---

v1:

- main: every commit/every night -> nightly release main
- occasionally: release to preview
- then less often:release to PUBLIC

Now we start working on v2 stuff:
Create branch v1 from main.
Now main represents "v2"

push changes to v1 -> bump version 1.1.0 -> release preview -> no more bugs -> promote release without bump to public

# 9th of August

Versions/Channels:

- Nightly
- Preview (preview for release)
- Release

### Nightly

In GitHub - releases (no tags), build every day at 12AMUTC (TBD) or on every push

version: date (yyyy.mm.dd)
version name: date + commit_hash

### Preview

Branch `main` will be the preview + release channel for now.

Once we decide that we need to start working on v2, we checkout `v1.x` and only push bug fixes and other important updates (backported with cherrypick or manually).
If the bugfix is applicable to main - PR to main, then cherry-pick/backport the commit and create a PR into `v1.x`

### Release/Public

Each release will have it's own version once we decided to work on the next major version.

`main` - nightly (when working on v3)
`v1.x` - maintenance mode
`v2.x` - maintenance mode

## Promoting releases

We by default release on preview channel. When we want to make it available on the public channel, we promote the preview channel release to the public channel.

The preview channel releases will be marked as pre-release in GitHub. When we promote them, we remote the pre-release tag.

## Workflows

When we start working on v2, we only increase build number in releases for the preview channel (like 2.0.0.x). Once v2 is released to PUBLIC, we start following semver again. The initial v2 in release in PUBLIC can use the same build number.
Preview -> 2.0.0.495 -> PUSH TO PUBLIC 2.0.0.495
then preview -> 2.0.x and release -> 2.0.x

2.0.0.0 -> preview
release current + bump to next version
