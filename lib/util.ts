 
export const ignorePatterns = [
  /node_modules/,
  /dist/,
  /build/,
  /tests?/,
  /\.github/,
  /\.vscode/,
  /yarn\.lock/,
  /package-lock\.json/,
  // optional: ignore ONLY root README.md
  /README\.md$/,
];

export function repoToCollectionName(repoUrl: string) {
  return repoUrl
    .replace("https://github.com/", "")
    .replaceAll("/", "_")
    .replaceAll("-", "_")
    .toLowerCase();
}
