// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require("node:fs/promises");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  console.log(JSON.stringify(context, null, 2))
    throw new Error('do not run!')
  const manifestPath = "./src/manifest.json";
  const manifestFile = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestFile);
  /**@type {string} */
  const existingVersion = manifest.version;

  const bumpType = /** @type {BumpType} */ (process.env.INPUT_VERSION);
  if (!bumpType) {
    throw new Error("Missing bump type");
  }

  const version = bumpVersion(existingVersion, bumpType).join(".");

  console.log({ existingVersion, bumpType, version });

  manifest.version = version;
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  core.setOutput("version", version);
};

/**
 * @typedef {'build' | 'patch' | 'minor'} BumpType
 * @param {string} existingVersion
 * @param {BumpType} type
 * @return {[major: number, minor: number, patch: number, build: number]}
 */
function bumpVersion(existingVersion, type) {
  const [major, minor, patch, build] = existingVersion.split(".").map(Number);

  switch (type) {
    case "build":
      return [major, minor, patch, build + 1];
    case "patch":
      return [major, minor, patch + 1, 0];
    case "minor":
      return [major, minor + 1, 0, 0];
    default:
      throw new Error("Unknown bump type: " + type);
  }
}

// @types/github-script@github:actions/github-script
