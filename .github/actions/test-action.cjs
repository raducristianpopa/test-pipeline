// @ts-check

/**
 * 1. Validate input version.
 * 2. Check if given tag/release is already promoted to stable. If so, crash.
 * @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments
 */
module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;
  const previewVersionTag = process.env.INPUT_VERSION;
  if (!previewVersionTag) {
    throw new Error("Missing env.INPUT_VERSION");
  }
  if (!previewVersionTag.match(/^v[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+-preview$/)) {
    throw new Error('Input "version" must match vX.X.X.X-preview');
  }
    
    github.rest.repos.listTags({

    })

  const versionTag = previewVersionTag.replace("-preview", "");
  try {
    await github.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag: versionTag,
    });
    
    throw new Error('already exists');
  } catch (e) {
      if(e.status && e.status !== 404) {
          throw new Error('Test error message')
      } 
  }
};
